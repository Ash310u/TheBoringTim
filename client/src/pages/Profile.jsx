const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img 
                    src="/default-avatar.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-medium text-gray-700 mt-4">Sarah Mitchell</h2>
                <p className="text-gray-500">@sarahm</p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-purple-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">Meditation Minutes</p>
                    <p className="text-2xl font-semibold text-navy-800">240</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">Streak Days</p>
                    <p className="text-2xl font-semibold text-navy-800">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activities */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-semibold text-navy-800">Your Profile</h1>
                  <p className="text-gray-600 mt-2">Find your inner peace</p>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="space-y-6 mb-8">
                <h2 className="text-xl font-semibold text-navy-800">Recent Sessions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Session Card 2 */}
                  <div className="bg-purple-50 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">Relax Mode</p>
                      <p className="text-sm text-gray-500">15 minutes • Yesterday</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-300 cursor-pointer transition-colors">
                      <span className="text-purple-600">▶</span>
                    </div>
                  </div>

                  {/* Session Card 3 */}
                  <div className="bg-purple-50 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg">Deep Focus</p>
                      <p className="text-sm text-gray-500">20 minutes • 2 days ago</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-300 cursor-pointer transition-colors">
                      <span className="text-purple-600">▶</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-navy-800">Meditation Analytics</h2>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Graph visualization coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

