var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};


const parentDiv = document.querySelector(".admin");
window.addEventListener("load", async () => {
    try {
        let result = await axios({
            method: "POST",
            url: "http://127.0.0.1:10000/api/getFiles",
        });
        let files = result.data.data;
        //   console.log("files = ", files[0].name);
        files.forEach((file) => {
            let creation_time = dateFromObjectId(file._id);
            // console.log("creation time = ", creation_time);
            // markup = `
            //   <div class="files__entity">
            //     <i class="files__icon fa fa-file-text" aria-hidden="true"></i>
            //     <span class="files__date">Date created:- ${creation_time}</span>
            //     <a href="${file.name}" class="files__link"><i class="fa fa-eye tests__icon" aria-hidden="true"></i></a>
            //   </div>
            // `;
            // // console.log("markup = ", markup);
            // parentDiv.insertAdjacentHTML("beforeend", markup);
        });
    } catch (error) {
        console.log(error);
    }
});