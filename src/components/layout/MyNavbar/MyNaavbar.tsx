'use client';

import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
	SidebarHeader, SidebarInset,
} from '@/components/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { User2, ChevronDown, Home, Briefcase, FileText } from 'lucide-react';


export default function MyNavbar() {
	const items = [
		{ title: 'Home', url: '/', icon: Home },
		{ title: 'Portfolio', url: '/portfolio', icon: Briefcase },
		{ title: 'Albums', url: '/albums', icon: FileText },

	];


	return (
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
							<DropdownMenuItem>내 계정</DropdownMenuItem>
							<DropdownMenuItem>설정</DropdownMenuItem>
							<DropdownMenuItem>로그아웃</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="text-xs text-muted-foreground p-2 text-center w-full">
						© 2024
					</div>
				</SidebarFooter>

			</Sidebar>

			<SidebarInset>
				{/*<SiteHeader />*/}
			{/*	<div className="flex flex-1 flex-col">*/}
			{/*		<div className="@container/main flex flex-1 flex-col gap-2">*/}
			{/*			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">*/}
			{/*				<SectionCards />*/}
			{/*				<div className="px-4 lg:px-6">*/}
			{/*					<ChartAreaInteractive />*/}
			{/*				</div>*/}
			{/*				<DataTable data={data} />*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			</SidebarInset>
		</SidebarProvider>
	);
}
