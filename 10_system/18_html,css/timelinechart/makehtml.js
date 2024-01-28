let fileInput = $("#SetSettingFile").get(0);

let typetable = {
    select:["InputFileType","GroupColumn","StartColumn","EndColumn","ColorColumn"],
    radio:["ChangeTimeSpan","ChangeBarWidth"],
    color:[],
}

function SetSettingFile() {
  if (!fileInput) {
    return;
  }
  let file = fileInput.files[0];
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
              $("#" + item).append( $('<input type="radio" name="TimeSpan" value="'+ item2.value + '" id="'+ item2.id + '" onchange="getSelectedValue()"><label for="'+ item2.id + '">' + item2.label + '</label>'));
          })
        }
      })

    } catch (error) {
      console.error("JSONファイルの読み込みエラー:", error);
    }
  };

  reader.readAsText(file);
}


console.log($('#ColorColumn').get(0).value);
console.log($("#ColorPallette > .TEST").get(0).id);
console.log(document.getElementById('ColorColumn').value)