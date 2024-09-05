export const UpdateDesignation = (dependencies: any) => {
    const { UpdateDesiRepo } = dependencies.repository; // Use the correct repository

    const executeFunction = async (DesiId: any, DesiName: any) => {
        try {
            console.log("Main updateDesignation function");

            // Call the repository method to update the designation
            const responseFromDesignationRepo = await UpdateDesiRepo.PostExit(DesiId, DesiName);

            // Debugging: Log the fetched designation data
            console.log("Fetched designation data:", responseFromDesignationRepo);

            // Return the fetched designation data
            return responseFromDesignationRepo;
        } catch (error) {
            console.error("Error updating designation:", error);
            return {
                status: false,
                message: "An error occurred while updating the designation",
                data: null
            };
        }
    };

    return { executeFunction };
};