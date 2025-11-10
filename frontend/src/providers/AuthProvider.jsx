// // Xác thực khi người dùng tải trang
// import React, { useEffect, useState } from 'react'
// import UseAuthStore from '../stores/UseAuthStore'

// const AuthProvider = ({ children }) => {
//     const [isInitialized, setIsInitialized] = useState(false);
//     const accessToken = UseAuthStore((state) => state.accessToken);
//     const fetchMe = UseAuthStore((state) => state.fetchMe);
//     const signout = UseAuthStore((state) => state.signout);

//     const initAuth = async () => {
//         if (accessToken && !isInitialized) {
//             try {
//                 await fetchMe();
//             } catch (error) {
//                 console.error('Lỗi khi lấy thông tin người dùng:', error);
//                 await signout(); // token lỗi → tự logout
//             } finally {
//                 setIsInitialized(true);
//             }
//         } else {
//             // Nếu không có token, đánh dấu là đã khởi tạo xong
//             setIsInitialized(true);
//         }
//     }

//     useEffect(() => {
//         initAuth()
//     }, [accessToken])

//     return children
// }

// export default AuthProvider