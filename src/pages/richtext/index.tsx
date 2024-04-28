import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "@tarojs/taro/html5.css";
import "./index.scss";

const TableEl = `
<table><colgroup><col style="width: 38.4901%;" width="348" /><col width="243" /><col /><col /></colgroup>
<tbody>
<tr>
<td data-sheet-value="&quot;项目名称&quot;">项目名称</td>
<td data-sheet-value="&quot;适合方向&quot;">适合方向</td>
<td height="27" data-sheet-value="&quot;申请要求&quot;">申请要求</td>
<td>官网网址</td>
</tr>
<tr>
<td data-sheet-value="&quot;美国-明尼苏达大学Carlson商学院&quot;">美国-明尼苏达大学Carlson商学院</td>
<td rowspan="5" width="243" data-sheet-value="&quot;不限&quot;">不限</td>
<td rowspan="5" width="461" data-sheet-value="&quot;1.学业成绩优良，所有课程平均学积分不得低于75分，在校期间课程无不及格记录（通识选修课、个性化课程、二专课程除外；考察成绩范围：入学&mdash;2022秋季学期）；\n2.具有良好的外语水平，具体成绩要求为：CET-4&ge;500分、TOFEL&ge;90分、IELTS&ge;6.0分，满足任一条件即可；对于有特别要求的学校，以交换学校的外语要求为准；&quot;">
<p>1.学业成绩优良，所有课程平均学积分不得低于75分，在校期间课程无不及格记录（通识选修课、个性化课程、二专课程除外；考察成绩范围：入学&mdash;2022秋季学期）；</p>
<p>1.学业成绩优良，所有课程平均学积分不得低于75分，在校期间课程无不及格记录（通识选修课、个性化课程、二专课程除外；考察成绩范围：入学&mdash;2022秋季学期）；<br />2.具有良好的外语水平，具体成绩要求为：CET-4&ge;500分、TOFEL&ge;90分、IELTS&ge;6.0分，满足任一条件即可；对于有特别要求的学校，以交换学校的外语要求为准；</p>
</td>
<td rowspan="5">
<p><a href="https://www.compassedu.com" target="_blank" rel="noopener">查看官网报名链接</a></p>
</td>
</tr>
<tr >
<td  data-sheet-value="&quot;加拿大-麦吉尔大学Desautels管理学院&quot;">加拿大-麦吉尔大学Desautels管理学院</td>
</tr>
<tr >
<td  data-sheet-value="&quot;英国-利兹大学商学院&quot;">英国-利兹大学商学院</td>
</tr>
<tr >
<td data-sheet-value="&quot;新加坡-南洋理工大学南洋商学院&quot;">新加坡-南洋理工大学南洋商学院</td>
</tr>
<tr >
<td  data-sheet-value="&quot;澳大利亚-悉尼大学&quot;">澳大利亚-悉尼大学</td>
</tr>
</tbody>
</table>
`;

function RichText() {

  return (
    <View className="taro_html" dangerouslySetInnerHTML={{ __html: TableEl }}>
      {(Taro.options.html.transformElement = (el) => {
        if (el.nodeName === 'image') {
          el.setAttribute('mode', 'widthFix')
          el.__handlers.tap = [
            () => {
            },
          ]
        }
        return el
      })}
    </View>
  );
}

export default RichText;
