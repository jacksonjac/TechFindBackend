


export const TechUploadImage = (dependencies: any) => {

    console.log("sfksjdfkl")
    const { TechImageUploadRepo} = dependencies.repositery;
    
      const executeFunction = async (data:any) => {
  
        console.log("sflksdflskdfj excutefuntion",data)
        
        try {
              
    
          const responseFromImageUpload = await TechImageUploadRepo.PostExit(data);
    
          console.log(responseFromImageUpload, "response from image");
          return {
            status: true,
            message: "Image uploaded successfully",
            data: responseFromImageUpload,
          };
        } catch (error) {
          console.error("Error uploading image:", error);
          return {
            status: false,
            message: "An error occurred while uploading the image",
            data: null,
          };
        }
      };
    
      return { executeFunction };
    };