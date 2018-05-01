// 当选择在校生时，出现两个select下拉菜单，一个选择城市，一个选择学校，当选择非在校生时，出一个文本输入框
// 学校下拉菜单里的学校名单均为城市下拉菜单中所选的城市中的大学，当城市发生变化时，学校一起发生变化

$(function () {
    let $sBtn = $('#sBtn'),
        $nsBtn = $("#nsBtn"),
        $stundentBox = $("#student"),
        $nsBox = $("#work"),
        $city = $("#city"),
        $school = $("#school"),
        options = {
            bj: [
                "北京大学",
                "清华大学",
                "北京航天大学"
            ],
            hlj: [
                "哈尔滨工业大学",
                "哈尔滨工程大学",
                "佳木斯大学"
            ],
            sh: [
                "复旦大学",
                "同济大学",
                "交通大学"
            ]
        },
        render = (value) => {
            let data = options[value];
            $school.get(0).length = 0;
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                let a = new Option(obj);
                $(a).appendTo($school)
            }
        }
    $sBtn.on('click', () => {
        $stundentBox.css('display', 'block');
        $nsBox.css('display', 'none');
    });
    $nsBtn.on('click', () => {
        $stundentBox.css('display', 'none');
        $nsBox.css('display', 'block');
    })
    $city.on('change', () => {
        let value = $city.val();
        render(value);
    })
})