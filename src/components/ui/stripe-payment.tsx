"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import type { Stripe, StripeElements } from '@stripe/stripe-js'

interface StripePaymentProps {
  onPaymentMethodAdded?: (paymentMethodId: string) => void
  onError?: (error: string) => void
  existingPaymentMethod?: {
    id: string
    card: {
      brand: string
      last4: string
      exp_month: number
      exp_year: number
    }
  } | null
}

export function StripePayment({ onPaymentMethodAdded, onError, existingPaymentMethod }: StripePaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(existingPaymentMethod?.id || null)
  const [error, setError] = useState<string | null>(null)
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [elements, setElements] = useState<StripeElements | null>(null)
  const [cardholderName, setCardholderName] = useState('')
  const [showChangeForm, setShowChangeForm] = useState(false)
  const cardElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadStripe = async () => {
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      setStripe(stripeInstance)
    }
    loadStripe()
  }, [])

  // Update payment method ID when existing payment method changes
  useEffect(() => {
    setPaymentMethodId(existingPaymentMethod?.id || null)
  }, [existingPaymentMethod])

  useEffect(() => {
    if (stripe && cardElementRef.current) {
      const elementsInstance = stripe.elements()
      const cardElement = elementsInstance.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
        hidePostalCode: false, // Show postal code field
      })
      cardElement.mount(cardElementRef.current)
      setElements(elementsInstance)
    }
  }, [stripe])

  const handleAddPaymentMethod = async () => {
    if (!stripe || !elements) {
      setError('Stripe not loaded')
      return
    }

    if (!cardholderName.trim()) {
      setError('Please enter the cardholder name')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create a setup intent
      const response = await fetch('/api/stripe/create-setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Setup intent error:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to create setup intent')
      }

      const { clientSecret } = await response.json()

      // Confirm the setup intent
      const cardElement = elements.getElement('card')
      if (!cardElement) {
        throw new Error('Card element not found')
      }
      
      const { error: confirmError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (confirmError) {
        throw new Error(confirmError.message)
      }

                    if (setupIntent?.payment_method) {
        const paymentMethodId = setupIntent.payment_method as string
        
        // Save payment method to database
        try {
          const saveResponse = await fetch('/api/stripe/save-payment-method', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId }),
          })

          if (!saveResponse.ok) {
            console.error('Failed to save payment method to database')
          } else {
            // Only update state after successful save
            setPaymentMethodId(paymentMethodId)
            setShowChangeForm(false) // Hide the change form
            onPaymentMethodAdded?.(paymentMethodId)
          }
        } catch (err) {
          console.error('Error saving payment method:', err)
          throw new Error('Failed to save payment method')
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
        <CardDescription>
          Add your payment method to book sessions with mentors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethodId && !showChangeForm ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                {existingPaymentMethod ? 'Payment Method' : 'Payment method added successfully!'}
              </span>
            </div>
            
            {existingPaymentMethod ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {existingPaymentMethod.card.brand.charAt(0).toUpperCase() + existingPaymentMethod.card.brand.slice(1)} •••• {existingPaymentMethod.card.last4}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expires {existingPaymentMethod.card.exp_month}/{existingPaymentMethod.card.exp_year}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Payment Method ID: {paymentMethodId.slice(-4)}
              </Badge>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setShowChangeForm(true)}
              className="w-full"
            >
              Change Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {showChangeForm && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Change Payment Method</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowChangeForm(false)}
                  className="text-sm"
                >
                  Cancel
                </Button>
              </div>
            )}
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Secure Payment Processing</p>
                <p className="text-blue-600 mt-1">
                  Your payment information is encrypted and secure. We use Stripe for all transactions.
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <Input
                  id="cardholder-name"
                  type="text"
                  placeholder="Name as it appears on card"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="card-element">Card Information</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Enter your card number, expiry date, CVC, and billing postal code
                </p>
                <div 
                  ref={cardElementRef}
                  id="card-element"
                  className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                />
              </div>
              
              <Button 
                onClick={handleAddPaymentMethod}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Adding Payment Method...' : (showChangeForm ? 'Update Payment Method' : 'Add Payment Method')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 