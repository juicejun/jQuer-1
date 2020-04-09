const api = jQuery(".test2");
api.addClass("red").addClass("blue");

$("#test").find(".child").addClass("red"); // 请确保这句话成功执行

api.each((div) => console.log(div));

api.parent().children().print();
api.siblings().print();

const $div = $("<div><span>1</span></div>");
const $childList = $(".child");
$("body").append($div);
// api.append($div);
