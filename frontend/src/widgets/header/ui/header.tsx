import { useCurrentProfile } from "@/entities/profile/hooks/useCurrentProfile";
import { Button, Image } from "@/shared/ui";
import { Container } from "@/widgets/container/container";

export const Header = () => {
  const { data: profile } = useCurrentProfile();
  return (
    <div className="bg-white h-16">
      <Container className="flex justify-between items-center h-full">
        <div>
          <Image alt="logo" src={"/images/company/techpolis-logo.png"} />
        </div>

        {!profile && (
          <div>
            <Button className="bg-[#F0F3F7] text-black hover:bg-[#F0F3F7] rounded-3xl">
              Регистрация
            </Button>
            <Button className="bg-[#D00E46] hover:bg-[#D00E46] rounded-3xl">
              Вход
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
