import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/services/userService';
import { UserNav } from './userNav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserNavWithData() {
  const userInfoQuery = useQuery({
    queryKey: ['user', 'info'],
    queryFn: fetchUserInfo,
    staleTime: Infinity,
  });

  if (userInfoQuery.isLoading) {
    return (
      <Button disabled variant="outline" className="h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-transparent"></AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (userInfoQuery.isError) {
    return (
      <Button disabled variant="outline" className="h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-transparent">Er</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const userData = userInfoQuery.data;
  return userData && <UserNav data={userData} />;
}
