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

            setAccessToken: (accessToken) => set({ accessToken }),

            clearState: () => {
                set({ accessToken: null, user: null, loading: false });
            },

            signup: async (displayedName, username, password, email, phoneNumber) => {
                try {
                    set({ loading: true });
                    const res = await AuthService.signup(displayedName, username, password, email, phoneNumber);
                    console.log('User after signin:', res.user); // Debug log
                    return { success: true };
                } catch (error) {
                    console.error(error);
                    console.log("Đăng ký thất bại!");
                    throw error; // 👈 THÊM DÒNG NÀY ĐỂ component biết có lỗi
                } finally {
                    set({ loading: false });
                }
            },

            signin: async (username, password) => {
                try {
                    set({ loading: true });
                    const res = await AuthService.signin(username, password);
                    if (res && res.accessToken) {
                        get().setAccessToken(res.accessToken);
                        set({
                            user: res.user,
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
                    get().clearState();
                    await AuthService.signout();

                    localStorage.removeItem("auth-storage"); // xóa toàn bộ dữ liệu persist
                    console.log("Đăng xuất thành công! Chuyển sang trang đăng nhập");
                } catch (error) {
                    console.error(error);
                    console.log("Đăng xuất thất bại!");
                    throw error;
                }
            },

            fetchMe: async () => {
                try {
                    set({ loading: true });

                    const user = await AuthService.fetchMe()
                    set({ user })

                } catch (error) {
                    console.error("Lấy thông tin người dùng thất bại!", error);
                    set({ user: null, accessToken: null });
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },
            updateProfile: async (displayedName, password, email, phoneNumber) => {
                try {
                    set({ loading: true });
                    const res = await AuthService.updateProfile(displayedName, password, email, phoneNumber);
                    set({ user: res.user })
                } catch (error) {
                    console.error("Cập nhật thông tin người dùng thất bại!", error);
                    set({ user: null, accessToken: null });
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },
            refresh: async () => {
                try {
                    console.log('🔄 Bắt đầu làm mới token...');
                    set({ loading: true });
                    const { user, fetchMe } = get() //lấy user, fetchMe trong stores
                    const accessToken = await AuthService.refresh()
                    console.log('✅ Token mới nhận được:', accessToken ? accessToken.substring(0, 20) + '...' : 'Không có token');
                    get().setAccessToken(accessToken)
                    console.log('✅ Đã cập nhật access token mới');

                    if (!user) {
                        await fetchMe()
                    }

                } catch (error) {
                    console.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại!", error);
                    get().clearState();
                    throw error;
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
            }),
        }
    )
);

export default UseAuthStore;

