$(document).ready(function(){
     $(document).on("click", ".savebtn", function(event){
          event.preventDefault();

          const id = event.target.id;

          $.ajax({
               url: `/articles/${id}`,
               method: `PUT`
          }).then(result=>{
               alert(`Article has been saved!`);
          }).catch(err=>{
               console.log(err);
          });
     });

     $(document).on("click", ".rmvbtn", function(event){
          event.preventDefault();

          const id = event.target.id;

          $.ajax({
               url: `/articles/${id}`,
               method: `DELETE`
          }).then(result=>{
               alert(`Article has been removed from the Saved List.`);
          }).catch(err=>{
               console.log(err);
          });
     });

     $(document).on("click", ".submit", function(event){
          event.preventDefault();

          const comment = {
               articleId: event.target.id,
               title: $(".cmmtTitle").val().trim(),
               text: $(".cmmtBody").val().trim()
          }

          $.ajax({
               url: `/comments/${comment.articleId}`,
               method: `POST`,
               body: comment
          }).then(result=>{
               alert(`Comment has been saved to Article.`);
          }).catch(err=>{
               console.log(err);
          });
     });
})