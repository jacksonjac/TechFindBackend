import { User } from "../../Database";

export default {
  postExist: async (data: any) => {
    try {
      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email: data.email });

      if (existingUser) {
        if (existingUser.google === true) {
          // Return success if the email already exists and google is true
          return { status: true, message: "User already exists with Google signup", data: existingUser };
        } else {
          // Return message if the email exists but google is not true
          return { status: false, message: "User already signed up with website", data: existingUser };
        }
      } else {
        // Create a new user with name, email, password, and google set to true
        const newUser = new User({
          name: data.name,
          email: data.email,
          password: data.password,
          google: true // Set google to true for new Google sign-ins
        });
        await newUser.save();

        return { status: true, message: "User registered successfully", data: newUser };
      }
    } catch (error) {
      console.error("Error in postExist:", error);
      return { status: false, message: "An error occurred during registration", error: error };
    }
  },
};
