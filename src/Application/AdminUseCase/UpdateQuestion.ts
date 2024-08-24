export const UpdateQuestion = (dependencies: any) => {
    const { UpdateQuesitonRepo } = dependencies.repositery;

    const executeFunction = async (questionId: any, questionData: any) => {
        try {
            console.log("main updateQuesiton function");
            const responseFromUserList = await UpdateQuesitonRepo.PostExit(questionId, questionData);

            // Debugging: Log the fetched user data
            console.log("Fetched user data:", responseFromUserList);

            // Return the fetched user data
            return responseFromUserList;
        } catch (error) {
            console.error("Error updating question:", error);
            return {
                status: false,
                message: "An error occurred while updating the question",
                data: null
            };
        }
    };

    return { executeFunction };
};
