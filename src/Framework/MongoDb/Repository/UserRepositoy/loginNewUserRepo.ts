import { User } from "../../Database";

export default {
  postExist: async (data: any) => {
    try {
      // Find the user with the provided email
      const loginUser = await User.findOne({ email: data.email });

      if (loginUser) {
        if (loginUser.google === true) {
          // If the user has signed in with Google, do not allow access
          return { status: false, message: "User is authenticated with Google. Access denied." };
        } else {
          // If the user is a normal user, allow access
          return { status: true, message: "User authenticated with website credentials", data: loginUser };
        }
      } else {
        // If no user is found, return a failure status
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error in postExist:", error);
      return { status: false, message: "An error occurred during login", error: error };
    }
  },
};
