// import React from 'react'
// import { useUser } from '../State/UserContext';
// import { Navigate, Route } from 'react-router';

// export default function ProtectedRoute({ path, element, isAdmin, ...rest }) {
//     const { user } = useUser();

//     // Vérification si l'utilisateur est connecté
//     const isAuthenticated = user !== null;

//     // Vérification si l'utilisateur a le droit d'accéder à une route admin
//     const isAuthorizedAdmin = isAdmin && user?.isAdmin;

//     return (
//         <div>
//             <Route
//                 {...rest}
//                 path={path}
//                 element={
//                     isAuthenticated && (!isAdmin || isAuthorizedAdmin) ? (
//                         element
//                     ) : (

//                         <Navigate to="/login" replace />
//                     )
//                 }
//             />
//         </div>

//     );
// }





import React from 'react';
import { useUser } from '../State/UserContext';
import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ element, isAdmin, ...rest }) {
//     const { user } = useUser();

//     // Vérification si l'utilisateur est connecté
//     const isAuthenticated = user !== null;

//     // Vérification si l'utilisateur a le droit d'accéder à une route admin
//     const isAuthorizedAdmin = isAdmin && user?.isAdmin;

//     // Si l'utilisateur n'est pas connecté ou n'a pas les droits pour accéder à une route admin
//     if (!isAuthenticated || (isAdmin && !isAuthorizedAdmin)) {
//         return <Navigate to="/login" replace />;
//     }

//     // Rendre la route si l'utilisateur est autorisé
//     return element;
// }



export default function ProtectedRoute({ element, isAdmin }) {
    const { user, loading } = useUser();

    // Afficher un indicateur de chargement tant que l'état de l'utilisateur est en cours de récupération
    if (loading) {
        return <div>loading...</div>; // Tu peux remplacer par un spinner ou autre indicateur
    }

    const isAuthenticated = user !== null;
    const isAuthorizedAdmin = isAdmin && user?.isAdmin;

    if (!isAuthenticated || (isAdmin && !isAuthorizedAdmin)) {
        return <Navigate to="/login" replace />;
    }

    return element;
}
