export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
              <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
