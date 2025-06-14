
import { useState, useEffect } from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { StatusSelector } from '../components/StatusSelector';
import { Header } from '../components/Header';
import { Login } from '../components/Login';
import { useAdmin } from '../contexts/AdminContext';
import { toast } from 'sonner';

const Index = () => {
  const { teamMembers, updateTeamMember, isAuthenticated, currentUser } = useAdmin();
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

  // Move all hooks to the top before any conditional returns
  useEffect(() => {
    if (currentUser && teamMembers.length > 0) {
      const memberData = teamMembers.find(member => member.name === currentUser.name) || teamMembers[0];
      setCurrentTeamMember(memberData);
    }
  }, [currentUser, teamMembers]);

  useEffect(() => {
    if (!isAuthenticated || !currentTeamMember) return;
    
    const interval = setInterval(() => {
      const otherMembers = teamMembers.filter(member => member.id !== currentTeamMember?.id);
      if (otherMembers.length > 0) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const statuses = ['available', 'busy', 'in-meeting', 'offline'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (randomMember.status !== randomStatus) {
          updateTeamMember(randomMember.id, { status: randomStatus });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [teamMembers, currentTeamMember?.id, updateTeamMember, isAuthenticated]);

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  const handleStatusChange = (newStatus) => {
    if (!currentTeamMember) return;
    
    const updatedMember = { ...currentTeamMember, status: newStatus, lastUpdated: new Date() };
    setCurrentTeamMember(updatedMember);
    updateTeamMember(currentTeamMember.id, { status: newStatus });

    toast.success(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace('-', ' ')}`);
  };

  if (teamMembers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No Team Members</h2>
            <p className="text-gray-600 dark:text-gray-300">Use the admin panel to add team members.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Current User Status Section */}
        {currentTeamMember && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Status</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <TeamMemberCard member={currentTeamMember} isCurrentUser={true} />
                <div className="flex-1">
                  <StatusSelector 
                    currentStatus={currentTeamMember.status} 
                    onStatusChange={handleStatusChange} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers
              .filter(member => member.id !== currentTeamMember?.id)
              .map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Team Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['available', 'busy', 'in-meeting', 'offline']).map(status => {
              const count = teamMembers.filter(member => member.status === status).length;
              const statusColors = {
                available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                busy: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                'in-meeting': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                offline: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
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
