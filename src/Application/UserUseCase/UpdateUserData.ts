


export const UpdateUserData = (dependencies: any) => {

    console.log("sfksjdfkl")
    const { UpdateUserDataRepo } = dependencies.repositery;
    
    const executeFunction = async (data: any) => {
        console.log("Executing update function with data:", data);
    
        try {
          // Call the repository function to update user data
          const responseFromUpdate = await UpdateUserDataRepo.PostExit(data);
    
          console.log("Response from updating user data:", responseFromUpdate);
          
          return {
            status: true,
            message: "User data updated successfully",
            data: responseFromUpdate,
          };
        } catch (error) {
          console.error("Error updating user data:", error);
          return {
            status: false,
            message: "An error occurred while updating the user data",
            data: null,
          };
        }
      };
    
      return { executeFunction };
    };