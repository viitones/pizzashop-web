import {
  Building,
  ChevronDown,
  LogOut,
} from 'lucide-react'

import { getManageRestaurant } from '@/api/get-manage-restaurant'
import { getProfile } from '@/api/get-profile'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { StoreProfileDialog } from './store-profile-dialog'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const {
    data: profile,
    isLoading: isLoadingProfile,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const {
    data: manageRestaurant,
    isLoading: isLoadingManageRestaurant,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManageRestaurant,
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManageRestaurant
              ? <Skeleton className="w-40 h-4" />
              : manageRestaurant?.name}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile
              ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                )
              : (
                <>
                  <span>{profile?.name}</span>
                  <span className=" text-xs font-normal text-muted-foreground">
                    {profile?.email}
                  </span>
                </>
                )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <StoreProfileDialog />
      </DialogContent>
    </Dialog>
  )
}
