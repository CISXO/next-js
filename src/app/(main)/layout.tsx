import MyNavbar from "@/components/layout/MyNavbar/MyNaavbar";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider, useSidebar
} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Book, Briefcase, ChevronDown, FileText, Home, User2} from "lucide-react";
import IsLogg from "@/components/islogin/IsLogin.client";

import { UserProvider } from "@/components/islogin/UserContext";

type MainLayoutProps = {
    children: React.ReactNode;
};

/**
 * 우리가 만든 API (express 서버)에서 “게시글" 리스트를 가져오고  렌더링 하세요.
 * 이 때 “게시글 리스트”에 대한 URL은 /boards 로 합니다.
 */


export default function MainLayout({ children }: MainLayoutProps) {

    const items = [
        { title: 'Home', url: '/', icon: Home },
        { title: 'Portfolio', url: '/portfolio', icon: Briefcase },
        { title: 'Albums', url: '/albums', icon: FileText },
        { title: 'Boards', url: '/boards', icon: Book },

    ];
    return (
        <div>
            {/*<MyNavbar />*/}
            <UserProvider>
                <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <span className="font-bold text-lg px-4 py-2 block">My App</span>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>메뉴</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className="flex items-center gap-2">
                                                    <item.icon size={18} />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full flex items-center gap-2">
                                    <User2 />
                                    Username
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                <DropdownMenuItem><a href="/register">회원가입</a></DropdownMenuItem>
                                <IsLogg/>
                                    {/*<DropdownMenuItem><a href="/login">로그인</a></DropdownMenuItem>*/}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="text-xs text-muted-foreground p-2 text-center w-full">
                            © 2024
                        </div>
                    </SidebarFooter>

                </Sidebar>

                <SidebarInset>
                    <main className="min-h-screen">{children}</main>
                </SidebarInset>
            </SidebarProvider>
            </UserProvider>
        </div>
    );
}