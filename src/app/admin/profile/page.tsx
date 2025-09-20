import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfileAdminPage = async () => {

  return (
    <>
      <Header title="Profile" />
    </>
  );
}

export default ProfileAdminPage;
