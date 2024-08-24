import { User } from "../../Database";

export default {
  postExist: async (data: any) => {
    try {
      // Check if the user with the provided email already exists
      let existingUser = await User.findOne({ email: data.email });

      if (existingUser) {
        // Update existing user data with the latest values
        existingUser.name = data.name;
        existingUser.district = data.district;
        existingUser.phone = data.phone;
        existingUser.password = data.password;

        await existingUser.save();

        return { status: true, message: "User data updated successfully", data: existingUser };
      } else {
        // Create a new user if no existing user is found
        const newUser = await User.create({
          name: data.name,
          email: data.email,
          district: data.district,
          phone: data.phone,
          password: data.password,
          
        });

        return { status: true, message: "User registered successfully", data: newUser };
      }
    } catch (error) {
      console.error("Error in postExist:", error);
      return { status: false, message: "An error occurred during registration", error: error };
    }
  },
};
