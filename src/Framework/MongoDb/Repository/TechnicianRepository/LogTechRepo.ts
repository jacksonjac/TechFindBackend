import { Technican } from "../../Database";

export default {
    PostExit: async (data: any) => {
        console.log("Inside PostExit function");
        const loginUser = await Technican.findOne({ email: data.email });
        console.log(loginUser, "Technician found");
        if (loginUser) {
            return { status: true, Data: loginUser };
        } else {
            return { status: false };
        }
    }
};