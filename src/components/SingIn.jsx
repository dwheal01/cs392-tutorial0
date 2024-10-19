import { signInWithGoogle, signOut, useAuthState, useProfile } from '../utilities/firebase';
import { Button } from 'react-bootstrap';
// import { useProfile } from '../utilities/profile';
// const AppRoutes = () => {
//   const [profile, profileLoading, profileError] = useProfile();
  
//   if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
//   if (profileLoading) return <h1>Loading user profile</h1>;
//   if (!profile) return <h1>No profile data</h1>;
  
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/users/:id" element={<UserFromUrl profile={profile} users={users} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };


const AuthButton = () => {
    const [profile, profileLoading, profileError] = useProfile();
    
    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;
    
    return profile.user ? <Button onClick={signOut}>{'Sign out'}</Button> : <Button onClick={signInWithGoogle}>{'Sign in'}</Button>;
  };
export default AuthButton