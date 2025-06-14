
import { useState, useEffect } from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { StatusSelector } from '../components/StatusSelector';
import { Header } from '../components/Header';
import { mockTeamMembers, TeamMember, Status } from '../data/mockData';
import { toast } from 'sonner';

const Index = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [currentUser, setCurrentUser] = useState<TeamMember>(mockTeamMembers[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update a team member's status (excluding current user)
      const otherMembers = teamMembers.filter(member => member.id !== currentUser.id);
      if (otherMembers.length > 0) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const statuses: Status[] = ['available', 'busy', 'in-meeting', 'offline'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (randomMember.status !== randomStatus) {
          setTeamMembers(prev => 
            prev.map(member => 
              member.id === randomMember.id 
                ? { ...member, status: randomStatus, lastUpdated: new Date() }
                : member
            )
          );
        }
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [teamMembers, currentUser.id]);

  const handleStatusChange = (newStatus: Status) => {
    const updatedUser = { ...currentUser, status: newStatus, lastUpdated: new Date() };
    setCurrentUser(updatedUser);
    
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === currentUser.id ? updatedUser : member
      )
    );

    toast.success(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace('-', ' ')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Current User Status Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Status</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <TeamMemberCard member={currentUser} isCurrentUser={true} />
              <div className="flex-1">
                <StatusSelector 
                  currentStatus={currentUser.status} 
                  onStatusChange={handleStatusChange} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers
              .filter(member => member.id !== currentUser.id)
              .map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Team Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['available', 'busy', 'in-meeting', 'offline'] as Status[]).map(status => {
              const count = teamMembers.filter(member => member.status === status).length;
              const statusColors = {
                available: 'bg-green-100 text-green-800',
                busy: 'bg-red-100 text-red-800',
                'in-meeting': 'bg-yellow-100 text-yellow-800',
                offline: 'bg-gray-100 text-gray-800'
              };
              
              return (
                <div key={status} className="text-center">
                  <div className={`rounded-lg p-4 ${statusColors[status]}`}>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm font-medium capitalize">
                      {status.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
