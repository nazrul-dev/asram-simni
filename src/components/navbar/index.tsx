import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, User } from "@nextui-org/react";
import { BookMarked, BookUp2, BookUser, ChevronsRight, Database, Flower, Info, ScrollText, Users, Warehouse } from "lucide-react"
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { siteConfig } from "@/config/site";

export default function NavHeader({ user }: any) {
    console.log(user)
    const dropdownMenuConfig = [
        {
            role: 'ALL',
            label: 'Master Data',
            items: [
                { key: 'pekerjaan', href: '/pekerjaan', icon: <BookMarked className="text-primary" size={20} />, label: 'Pekerjaan' },
                { key: 'jabatan', href: '/jabatan', icon: <BookUp2 className="text-primary" size={20} />, label: 'Jabatan' },
                { key: 'aparatur', href: '/aparatur', icon: <BookUser className="text-primary" size={20} />, label: 'Aparatur' },
                { key: 'users', href: '/user', icon: <Users className="text-primary" size={20} />, label: 'User' },
            ],
        },
        {
            role: 'ALL',
            label: 'Dokumen',
            items: [
                { key: 'document-nikah', href: '/dokumen/nikah', icon: <ScrollText className="text-primary" size={20} />, label: 'Dokumen Nikah' },
                { key: 'dokumen-kematian', href: '/dokumen/kematian', icon: <ScrollText className="text-primary" size={20} />, label: 'Dokumen Kematian' },
            ],
        },
        {
            role: 'PRIMARY',
            label: 'Konfigurasi',
            items: [
                { key: 'document-nikah', href: '/dokumen/nikah', icon: <Database className="text-primary" size={20} />, label: 'Database' },
                { key: 'dokumen-kematian', href: '/dokumen/kematian', icon: <Warehouse className="text-primary" size={20} />, label: 'Desa' },
                { key: 'dokumen-kematian', href: '/dokumen/kematian', icon: <Info className="text-primary" size={20} />, label: 'Info Aplikasi' },
            ],
        },
    ];

    return (
        <Navbar maxWidth="xl">
            <NavbarBrand>
                <div>
                    <Flower className="text-primary mr-1" />
                </div>
                <p className="font-bold text-inherit">{siteConfig?.name}</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className="hidden lg:flex">
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        as={Link}
                        href="/"
                        radius="sm"
                        variant="light"
                    >
                        Beranda
                    </Button>
                </NavbarItem>
                {dropdownMenuConfig.map((dropdown) => (user?.type_user === dropdown?.role || dropdown?.role === 'ALL') && (
                    <Dropdown key={dropdown.label}>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                    endContent={<ChevronsRight size={16} />} // Gantilah dengan ikon chevron yang Anda gunakan
                                    radius="sm"
                                    variant="light"
                                >
                                    {dropdown.label}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label={`${dropdown.label} features`}
                            className="w-[340px]"
                            itemClasses={{
                                base: 'gap-4',
                            }}
                        >
                            {dropdown.items.map((item) => (
                                <DropdownItem
                                    key={item.key}
                                    startContent={item.icon}
                                >
                                    <Link className="hover:underline" href={item.href}>{item.label}</Link>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <User
                            as="button"

                            avatarProps={{
                                color: user?.type_user === 'PRIMARY' ? 'primary' : 'secondary',
                                radius: 'sm',
                                size: "sm",
                                isBordered: true,

                            }}
                            className="transition-transform"
                            description={user?.email}
                            name={user?.nama_user}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">login Sebagai</p>
                            <p className="font-bold">{user?.email}</p>
                        </DropdownItem>
                        <DropdownItem className={`${user?.type_user !== 'PRIMARY' ? 'hidden' : ''}`} key="settings" href="/profile">
                            Upgrade Membership
                        </DropdownItem>
                        <DropdownItem key="settings" href="/profile">
                            Profile Saya
                        </DropdownItem>

                        {/* <DropdownItem key="help_and_feedback">
                            Bantuan & masukan
                        </DropdownItem> */}
                        <DropdownItem onClick={() => signOut({ redirect: true })} key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
