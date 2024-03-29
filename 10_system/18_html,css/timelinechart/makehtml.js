function SetSettingFile() {
  let fileInput = $("#SetSettingFile").get(0).files[0];

  let typetable = {
      select:["InputMethodType","GroupColumn","RecordColumn","CommentColumn","StartColumn","EndColumn","ColorColumn","FilterItem","SearchItem"],
      radio:["ChangeTimeSpan","ChangeBarWidth"],
      color:["ColorPallette"],
  }
  
  if (!fileInput) {
    return;
  }
  // let file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const jsonData = JSON.parse(e.target.result);

      if(!jsonData){
        return;
      }

      // ドロップダウンリスト(SELECT)の初期設定
      typetable.select.map((item) => {
        if(jsonData[item]){
            $("#" + item + " > option").remove();
            jsonData[item].map((item2) => {
                $("#"+item).append($("<option>").html(item2));
            })
          }        
      })

      // RADIOの初期設定
      typetable.radio.map((item) => {
        if(jsonData[item]){
          $("#" + item + " > input").remove();
          $("#" + item + " > label").remove();
          jsonData[item].map((item2) => {
            console.log(item.replace("Change", ""))
              $("#" + item).append( $('<input type="radio" name="' + item.replace("Change", "") + '" value="'+ item2.value + '" id="'+ item2.id + '" onchange="getSelectedValue()" '+item2.checked+'><label for="'+ item2.id + '">' + item2.label + '</label>'));
          })
        }
      })

      // COLORの初期設定
      typetable.color.map((item) => {
        if(jsonData[item]){
          $("#" + item + " > input").remove();
          $("#" + item + " > label").remove();
          jsonData[item].map((item2) => {
            $("#ColorPallette").append( $('<input type="color" class="'+ item2.label +'" value="'+ item2.value + '" id="'+ item2.id + '" onchange="getSelectedValue()"><label for="'+ item2.id + '">' + item2.label + '</label>'));
          })
        }
      })

    } catch (error) {
      console.error("JSONファイルの読み込みエラー:", error);
    }
  };

  reader.readAsText(fileInput);
}


// $("#ColorPallette > input").remove()
// $("#ColorPallette > label").remove()

// $("#ColorPallette").append( $('<input type="color" class="'+ item2.label +'" value="'+ item2.value + '" id="'+ item2.id + '" onchange="getSelectedValue()"><label for="'+ item2.id + '">' + item2.label + '</label>'));
