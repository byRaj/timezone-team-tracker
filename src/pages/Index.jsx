import { useState, useEffect } from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { StatusSelector } from '../components/StatusSelector';
import { Header } from '../components/Header';
import { Login } from '../components/Login';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'sonner';

const Index = () => {
  const { teamMembers, updateTeamMember, isAuthenticated, currentUser, loading } = useAdmin();
  const { theme } = useTheme();
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

  useEffect(() => {
    if (currentUser && teamMembers.length > 0) {
      const memberData = teamMembers.find(member => member._id === currentUser._id) || teamMembers[0];
      setCurrentTeamMember(memberData);
    }
  }, [currentUser, teamMembers]);

  useEffect(() => {
    if (!isAuthenticated || !currentTeamMember) return;
    
    const interval = setInterval(() => {
      const otherMembers = teamMembers.filter(member => member._id !== currentTeamMember?._id);
      if (otherMembers.length > 0) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const statuses = ['available', 'busy', 'in-meeting', 'offline'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (randomMember.status !== randomStatus) {
          updateTeamMember(randomMember._id, { status: randomStatus });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [teamMembers, currentTeamMember?._id, updateTeamMember, isAuthenticated]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '8px'
          }}>
            Loading team data...
          </div>
          <div style={{ 
            color: theme === 'dark' ? '#94a3b8' : '#64748b'
          }}>
            Connecting to MongoDB
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleStatusChange = (newStatus) => {
    if (!currentTeamMember) return;
    
    const updatedMember = { ...currentTeamMember, status: newStatus, lastUpdated: new Date() };
    setCurrentTeamMember(updatedMember);
    updateTeamMember(currentTeamMember._id, { status: newStatus });

    toast.success(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace('-', ' ')}`);
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  const noMembersStyle = {
    textAlign: 'center',
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0'
  };

  const noMembersTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#1e293b',
    marginBottom: '16px'
  };

  const noMembersTextStyle = {
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const sectionStyle = {
    marginBottom: '32px'
  };

  const currentUserSectionStyle = {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '24px',
    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0'
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#1e293b',
    marginBottom: '24px'
  };

  const currentUserContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const currentUserContentLargeStyle = {
    ...currentUserContentStyle,
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  };

  const statusSelectorStyle = {
    flex: 1
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  };

  const statsStyle = {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '24px',
    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  };

  const statsGridLargeStyle = {
    ...statsGridStyle,
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  };

  const getStatCardStyle = (status) => {
    const colors = {
      available: { bg: '#059669', text: '#ffffff' },
      busy: { bg: '#dc2626', text: '#ffffff' },
      'in-meeting': { bg: '#d97706', text: '#ffffff' },
      offline: { bg: '#4b5563', text: '#e5e7eb' }
    };
    
    return {
      textAlign: 'center',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: colors[status].bg,
      color: colors[status].text,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };
  };

  const statNumberStyle = {
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const statLabelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'capitalize'
  };

  if (teamMembers.length === 0) {
    return (
      <div style={pageStyle}>
        <Header />
        <main style={containerStyle}>
          <div style={noMembersStyle}>
            <h2 style={noMembersTitleStyle}>No Team Members</h2>
            <p style={noMembersTextStyle}>Use the admin panel to add team members.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Header />
      
      <main style={containerStyle}>
        {currentTeamMember && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              border: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#ffffff' : '#1e293b',
                marginBottom: '24px'
              }}>Your Status</h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <TeamMemberCard member={currentTeamMember} isCurrentUser={true} />
                <div style={{ flex: 1 }}>
                  <StatusSelector 
                    currentStatus={currentTeamMember.status} 
                    onStatusChange={handleStatusChange} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '24px'
          }}>Team Members</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {teamMembers
              .filter(member => member._id !== currentTeamMember?._id)
              .map(member => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
          </div>
        </div>

        <div style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '24px',
          border: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '24px'
          }}>Team Overview</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {(['available', 'busy', 'in-meeting', 'offline']).map(status => {
              const count = teamMembers.filter(member => member.status === status).length;
              const colors = {
                available: { bg: '#059669', text: '#ffffff' },
                busy: { bg: '#dc2626', text: '#ffffff' },
                'in-meeting': { bg: '#d97706', text: '#ffffff' },
                offline: { bg: '#4b5563', text: '#e5e7eb' }
              };
              
              return (
                <div key={status} style={{
                  textAlign: 'center',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: colors[status].bg,
                  color: colors[status].text,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>{count}</div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {status.replace('-', ' ')}
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
