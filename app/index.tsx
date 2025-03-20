// import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
  // const { isSignedIn } = useAuth();

  // return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/sign-in" />;
};


export default Page;

// function useAuth(): { isSignedIn: any; } {
//   throw new Error("Function not implemented.");
// }
