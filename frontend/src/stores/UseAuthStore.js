import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AuthService from "../services/AuthService";
import api from "../config/api";

const UseAuthStore = create(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            loading: false,
            role: null,

            setAccessToken: (accessToken) => set({ accessToken }),

            clearState: () => {
                set({ accessToken: null, user: null, loading: false });
            },

            signup: async (displayedName, username, password, email, phoneNumber) => {
                try {
                    set({ loading: true });
                    await AuthService.signup(displayedName, username, password, email, phoneNumber);
                    console.log("Đăng ký thành công! Chuyển sang trang đăng nhập");
                } catch (error) {
                    console.error(error);
                    console.log("Đăng ký thất bại!");
                } finally {
                    set({ loading: false });
                }
            },

            signin: async (username, password) => {
                try {
                    set({ loading: true });
                    const res = await AuthService.signin(username, password);
                    if (res && res.accessToken) {
                        set({
                            accessToken: res.accessToken,
                            user: res.user,
                            role: res.data.user.role,
                            loading: false
                        });

                        console.log('User after signin:', res.user); // Debug log
                        return { success: true };
                    }
                    throw new Error('Invalid response from server');
                } catch (error) {
                    console.error("Đăng nhập thất bại:", error);
                    set({ loading: false });
                    throw error; // Quan trọng: Ném lỗi để xử lý ở component
                }
            },

            signout: async () => {
                try {
                    await AuthService.signout();
                    set({ accessToken: null, user: null });
                    localStorage.removeItem("auth-storage"); // xóa toàn bộ dữ liệu persist
                    console.log("Đăng xuất thành công! Chuyển sang trang đăng nhập");
                } catch (error) {
                    console.error(error);
                    console.log("Đăng xuất thất bại!");
                }
            },

            fetchMe: async () => {
                try {
                    set({ loading: true });
                    const { accessToken } = get(); // Lấy token từ store
                    if (!accessToken) throw new Error("No access token");

                    const response = await api.get("/users/me", {
                        headers: { Authorization: `Bearer ${accessToken}` } //gửi cả access token vào header
                    });

                    set({
                        user: response.data,
                        role: response.data.user.role
                    });
                    return response.data;
                } catch (error) {
                    console.error("Lấy thông tin người dùng thất bại!", error);
                    set({ user: null, role: null });
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
                role: state.role,
            }),
        }
    )
);

export default UseAuthStore;

