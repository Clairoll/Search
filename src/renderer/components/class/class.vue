<template>
  <div class="class">
    <div v-if="item.length===0">
      <img src="../../assets/loading.gif" class="loading">
    </div>
    <div v-else>
      <div class="bg">
        <span class="title">课程表服务</span>
      </div>
      <div class="main">
        <div class="center">
          <div class="menu-class">
            <div class="menu">
              <img class="avator" src="../../assets/avator.png">
              <span class="name">{{this.$route.query.XM}}</span>
            </div>
          <div class="detailed">
            <span>我的课表</span>
          </div>
          </div>
          <div class="wapper-class">
            <h1>学期课程</h1>
            <div class="search-class">
              <from>
                <span class="search">学年学期:</span>
                <select name="text" class="term" ref="year">
                  <option v-for="(index, i) in callbacktime">{{callbacktime[i]}}</option> 
                </select>
                <select name="text" class="term" ref="term">
                  <option value="1">第1学期</option>
                  <option value="2">第2学期</option>
                </select>
                <button class="btn-class" type="button" @click="_submit">切换</button>
              </from>
            </div>
            <table class="class-table" border="1" cellpadding="0" cellspacing="0" style="border: solid thin #ccc">
              <thead class="thead">
                <tr>
                  <th colspan="2" class="thead-th">节次</th>
                  <th>星期一</th>
                  <th>星期二</th>
                  <th>星期三</th>
                  <th>星期四</th>
                  <th>星期五</th>
                  <th>星期六</th>
                  <th>星期日</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr>
                  <td rowspan="4" class="thead-td">上午</td>
                  <td class="thead-td">第一节</td>

                  <td rowspan="2" v-if="item[0].length === 0"></td>
                  <td rowspan="2" v-else-if="item[0].length === 1">
                    {{item[0][0].kcmc}}◇{{item[0][0].zzt}},[{{item[0][0].ksjc}}-{{item[0][0].jsjc}}节]◇{{item[0][0].jsxm}}◇{{item[0][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[0][0].kcmc}}◇{{item[0][0].zzt}},[{{item[0][0].ksjc}}-{{item[0][0].jsjc}}节]◇{{item[0][0].jsxm}}◇{{item[0][0].skjsmc}}<br><br>
                    {{item[0][1].kcmc}}◇{{item[0][1].zzt}},[{{item[0][1].ksjc}}-{{item[0][1].jsjc}}节]◇{{item[0][1].jsxm}}◇{{item[0][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[11].length === 0"></td>
                  <td rowspan="2" v-else-if="item[11].length === 1">
                    {{item[11][0].kcmc}}◇{{item[11][0].zzt}},[{{item[11][0].ksjc}}-{{item[11][0].jsjc}}节]◇{{item[11][0].jsxm}}◇{{item[11][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[11][0].kcmc}}◇{{item[11][0].zzt}},[{{item[11][0].ksjc}}-{{item[11][0].jsjc}}节]◇{{item[11][0].jsxm}}◇{{item[11][0].skjsmc}}<br><br>
                    {{item[11][1].kcmc}}◇{{item[11][1].zzt}},[{{item[11][1].ksjc}}-{{item[11][1].jsjc}}节]◇{{item[11][1].jsxm}}◇{{item[11][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[22].length === 0"></td>
                  <td rowspan="2" v-else-if="item[22].length === 1">
                    {{item[22][0].kcmc}}◇{{item[22][0].zzt}},[{{item[22][0].ksjc}}-{{item[22][0].jsjc}}节]◇{{item[22][0].jsxm}}◇{{item[22][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[22][0].kcmc}}◇{{item[22][0].zzt}},[{{item[22][0].ksjc}}-{{item[22][0].jsjc}}节]◇{{item[22][0].jsxm}}◇{{item[22][0].skjsmc}}<br><br>
                    {{item[22][1].kcmc}}◇{{item[22][1].zzt}},[{{item[22][1].ksjc}}-{{item[22][1].jsjc}}节]◇{{item[22][1].jsxm}}◇{{item[22][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[33].length === 0"></td>
                  <td rowspan="2" v-else-if="item[33].length === 1">
                    {{item[33][0].kcmc}}◇{{item[33][0].zzt}},[{{item[33][0].ksjc}}-{{item[33][0].jsjc}}节]◇{{item[33][0].jsxm}}◇{{item[33][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[33][0].kcmc}}◇{{item[33][0].zzt}},[{{item[33][0].ksjc}}-{{item[33][0].jsjc}}节]◇{{item[33][0].jsxm}}◇{{item[33][0].skjsmc}}<br><br>
                    {{item[33][1].kcmc}}◇{{item[33][1].zzt}},[{{item[33][1].ksjc}}-{{item[33][1].jsjc}}节]◇{{item[33][1].jsxm}}◇{{item[33][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[44].length === 0"></td>
                  <td rowspan="2" v-else-if="item[44].length === 1">
                    {{item[44][0].kcmc}}◇{{item[44][0].zzt}},[{{item[44][0].ksjc}}-{{item[44][0].jsjc}}节]◇{{item[44][0].jsxm}}◇{{item[44][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[44][0].kcmc}}◇{{item[44][0].zzt}},[{{item[44][0].ksjc}}-{{item[44][0].jsjc}}节]◇{{item[44][0].jsxm}}◇{{item[44][0].skjsmc}}<br><br>
                    {{item[44][1].kcmc}}◇{{item[44][1].zzt}},[{{item[44][1].ksjc}}-{{item[44][1].jsjc}}节]◇{{item[44][1].jsxm}}◇{{item[44][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[55].length === 0"></td>
                  <td rowspan="2" v-else-if="item[55].length === 1">
                    {{item[55][0].kcmc}}◇{{item[55][0].zzt}},[{{item[55][0].ksjc}}-{{item[55][0].jsjc}}节]◇{{item[55][0].jsxm}}◇{{item[55][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[55][0].kcmc}}◇{{item[55][0].zzt}},[{{item[55][0].ksjc}}-{{item[55][0].jsjc}}节]◇{{item[55][0].jsxm}}◇{{item[55][0].skjsmc}}<br><br>
                    {{item[55][1].kcmc}}◇{{item[55][1].zzt}},[{{item[55][1].ksjc}}-{{item[55][1].jsjc}}节]◇{{item[55][1].jsxm}}◇{{item[55][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[66].length === 0"></td>
                  <td rowspan="2" v-else-if="item[66].length === 1">
                    {{item[66][0].kcmc}}◇{{item[66][0].zzt}},[{{item[66][0].ksjc}}-{{item[66][0].jsjc}}节]◇{{item[66][0].jsxm}}◇{{item[66][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[66][0].kcmc}}◇{{item[66][0].zzt}},[{{item[66][0].ksjc}}-{{item[66][0].jsjc}}节]◇{{item[66][0].jsxm}}◇{{item[66][0].skjsmc}}<br><br>
                    {{item[66][1].kcmc}}◇{{item[66][1].zzt}},[{{item[66][1].ksjc}}-{{item[66][1].jsjc}}节]◇{{item[66][1].jsxm}}◇{{item[66][1].skjsmc}}
                  </td>
                  </tr>
                <tr>
                  <td class="thead-td">第二节</td>
                </tr>
                <tr>
                  <td class="thead-td">第三节</td>

                   <td rowspan="2" v-if="item[2].length === 0"></td>
                  <td rowspan="2" v-else-if="item[2].length === 1">
                    {{item[2][0].kcmc}}◇{{item[2][0].zzt}},[{{item[2][0].ksjc}}-{{item[2][0].jsjc}}节]◇{{item[2][0].jsxm}}◇{{item[2][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[2][0].kcmc}}◇{{item[2][0].zzt}},[{{item[2][0].ksjc}}-{{item[2][0].jsjc}}节]◇{{item[2][0].jsxm}}◇{{item[2][0].skjsmc}}<br><br>
                    {{item[2][1].kcmc}}◇{{item[2][1].zzt}},[{{item[2][1].ksjc}}-{{item[2][1].jsjc}}节]◇{{item[2][1].jsxm}}◇{{item[2][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[13].length === 0"></td>
                  <td rowspan="2" v-else-if="item[13].length === 1">
                    {{item[13][0].kcmc}}◇{{item[13][0].zzt}},[{{item[13][0].ksjc}}-{{item[13][0].jsjc}}节]◇{{item[13][0].jsxm}}◇{{item[13][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[13][0].kcmc}}◇{{item[13][0].zzt}},[{{item[13][0].ksjc}}-{{item[13][0].jsjc}}节]◇{{item[13][0].jsxm}}◇{{item[13][0].skjsmc}}<br><br>
                    {{item[13][1].kcmc}}◇{{item[13][1].zzt}},[{{item[13][1].ksjc}}-{{item[13][1].jsjc}}节]◇{{item[13][1].jsxm}}◇{{item[13][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[24].length === 0"></td>
                  <td rowspan="2" v-else-if="item[24].length === 1">
                    {{item[24][0].kcmc}}◇{{item[24][0].zzt}},[{{item[24][0].ksjc}}-{{item[24][0].jsjc}}节]◇{{item[24][0].jsxm}}◇{{item[24][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[24][0].kcmc}}◇{{item[24][0].zzt}},[{{item[24][0].ksjc}}-{{item[24][0].jsjc}}节]◇{{item[24][0].jsxm}}◇{{item[24][0].skjsmc}}<br><br>
                    {{item[24][1].kcmc}}◇{{item[24][1].zzt}},[{{item[24][1].ksjc}}-{{item[24][1].jsjc}}节]◇{{item[24][1].jsxm}}◇{{item[24][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[35].length === 0"></td>
                  <td rowspan="2" v-else-if="item[35].length === 1">
                    {{item[35][0].kcmc}}◇{{item[35][0].zzt}},[{{item[35][0].ksjc}}-{{item[35][0].jsjc}}节]◇{{item[35][0].jsxm}}◇{{item[35][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[35][0].kcmc}}◇{{item[35][0].zzt}},[{{item[35][0].ksjc}}-{{item[35][0].jsjc}}节]◇{{item[35][0].jsxm}}◇{{item[35][0].skjsmc}}<br><br>
                    {{item[35][1].kcmc}}◇{{item[35][1].zzt}},[{{item[35][1].ksjc}}-{{item[35][1].jsjc}}节]◇{{item[35][1].jsxm}}◇{{item[35][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[46].length === 0"></td>
                  <td rowspan="2" v-else-if="item[46].length === 1">
                    {{item[46][0].kcmc}}◇{{item[46][0].zzt}},[{{item[46][0].ksjc}}-{{item[46][0].jsjc}}节]◇{{item[46][0].jsxm}}◇{{item[46][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[46][0].kcmc}}◇{{item[46][0].zzt}},[{{item[46][0].ksjc}}-{{item[46][0].jsjc}}节]◇{{item[46][0].jsxm}}◇{{item[46][0].skjsmc}}<br><br>
                    {{item[46][1].kcmc}}◇{{item[46][1].zzt}},[{{item[46][1].ksjc}}-{{item[46][1].jsjc}}节]◇{{item[46][1].jsxm}}◇{{item[46][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[57].length === 0"></td>
                  <td rowspan="2" v-else-if="item[57].length === 1">
                    {{item[57][0].kcmc}}◇{{item[57][0].zzt}},[{{item[57][0].ksjc}}-{{item[57][0].jsjc}}节]◇{{item[57][0].jsxm}}◇{{item[57][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[57][0].kcmc}}◇{{item[57][0].zzt}},[{{item[57][0].ksjc}}-{{item[57][0].jsjc}}节]◇{{item[57][0].jsxm}}◇{{item[57][0].skjsmc}}<br><br>
                    {{item[57][1].kcmc}}◇{{item[57][1].zzt}},[{{item[57][1].ksjc}}-{{item[57][1].jsjc}}节]◇{{item[57][1].jsxm}}◇{{item[57][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[68].length === 0"></td>
                  <td rowspan="2" v-else-if="item[68].length === 1">
                    {{item[68][0].kcmc}}◇{{item[68][0].zzt}},[{{item[68][0].ksjc}}-{{item[68][0].jsjc}}节]◇{{item[68][0].jsxm}}◇{{item[68][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[68][0].kcmc}}◇{{item[68][0].zzt}},[{{item[68][0].ksjc}}-{{item[68][0].jsjc}}节]◇{{item[68][0].jsxm}}◇{{item[68][0].skjsmc}}<br><br>
                    {{item[68][1].kcmc}}◇{{item[68][1].zzt}},[{{item[68][1].ksjc}}-{{item[68][1].jsjc}}节]◇{{item[68][1].jsxm}}◇{{item[68][1].skjsmc}}
                  </td>
                </tr>
                <tr>
                  <td class="thead-td">第四节</td>
                </tr>
                <tr>
                  <td rowspan="4" class="thead-td">下午</td>
                  <td class="thead-td">第五节</td>

                  <td rowspan="2" v-if="item[4].length === 0"></td>
                  <td rowspan="2" v-else-if="item[4].length === 1">
                    {{item[4][0].kcmc}}◇{{item[4][0].zzt}},[{{item[4][0].ksjc}}-{{item[4][0].jsjc}}节]◇{{item[4][0].jsxm}}◇{{item[4][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[4][0].kcmc}}◇{{item[4][0].zzt}},[{{item[4][0].ksjc}}-{{item[4][0].jsjc}}节]◇{{item[4][0].jsxm}}◇{{item[4][0].skjsmc}}<br><br>
                    {{item[4][1].kcmc}}◇{{item[4][1].zzt}},[{{item[4][1].ksjc}}-{{item[4][1].jsjc}}节]◇{{item[4][1].jsxm}}◇{{item[4][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[15].length === 0"></td>
                  <td rowspan="2" v-else-if="item[15].length === 1">
                    {{item[15][0].kcmc}}◇{{item[15][0].zzt}},[{{item[15][0].ksjc}}-{{item[15][0].jsjc}}节]◇{{item[15][0].jsxm}}◇{{item[15][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[15][0].kcmc}}◇{{item[15][0].zzt}},[{{item[15][0].ksjc}}-{{item[15][0].jsjc}}节]◇{{item[15][0].jsxm}}◇{{item[15][0].skjsmc}}<br><br>
                    {{item[15][1].kcmc}}◇{{item[15][1].zzt}},[{{item[15][1].ksjc}}-{{item[15][1].jsjc}}节]◇{{item[15][1].jsxm}}◇{{item[15][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[26].length === 0"></td>
                  <td rowspan="2" v-else-if="item[26].length === 1">
                    {{item[26][0].kcmc}}◇{{item[26][0].zzt}},[{{item[26][0].ksjc}}-{{item[26][0].jsjc}}节]◇{{item[26][0].jsxm}}◇{{item[26][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[26][0].kcmc}}◇{{item[26][0].zzt}},[{{item[26][0].ksjc}}-{{item[26][0].jsjc}}节]◇{{item[26][0].jsxm}}◇{{item[26][0].skjsmc}}<br><br>
                    {{item[26][1].kcmc}}◇{{item[26][1].zzt}},[{{item[26][1].ksjc}}-{{item[26][1].jsjc}}节]◇{{item[26][1].jsxm}}◇{{item[26][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[37].length === 0"></td>
                  <td rowspan="2" v-else-if="item[37].length === 1">
                    {{item[37][0].kcmc}}◇{{item[37][0].zzt}},[{{item[37][0].ksjc}}-{{item[37][0].jsjc}}节]◇{{item[37][0].jsxm}}◇{{item[37][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[37][0].kcmc}}◇{{item[37][0].zzt}},[{{item[37][0].ksjc}}-{{item[37][0].jsjc}}节]◇{{item[37][0].jsxm}}◇{{item[37][0].skjsmc}}<br><br>
                    {{item[37][1].kcmc}}◇{{item[37][1].zzt}},[{{item[37][1].ksjc}}-{{item[37][1].jsjc}}节]◇{{item[37][1].jsxm}}◇{{item[37][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[48].length === 0"></td>
                  <td rowspan="2" v-else-if="item[48].length === 1">
                    {{item[48][0].kcmc}}◇{{item[48][0].zzt}},[{{item[48][0].ksjc}}-{{item[48][0].jsjc}}节]◇{{item[48][0].jsxm}}◇{{item[48][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[48][0].kcmc}}◇{{item[48][0].zzt}},[{{item[48][0].ksjc}}-{{item[48][0].jsjc}}节]◇{{item[48][0].jsxm}}◇{{item[48][0].skjsmc}}<br><br>
                    {{item[48][1].kcmc}}◇{{item[48][1].zzt}},[{{item[48][1].ksjc}}-{{item[48][1].jsjc}}节]◇{{item[48][1].jsxm}}◇{{item[48][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[59].length === 0"></td>
                  <td rowspan="2" v-else-if="item[59].length === 1">
                    {{item[59][0].kcmc}}◇{{item[59][0].zzt}},[{{item[59][0].ksjc}}-{{item[59][0].jsjc}}节]◇{{item[59][0].jsxm}}◇{{item[59][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[59][0].kcmc}}◇{{item[59][0].zzt}},[{{item[59][0].ksjc}}-{{item[59][0].jsjc}}节]◇{{item[59][0].jsxm}}◇{{item[59][0].skjsmc}}<br><br>
                    {{item[59][1].kcmc}}◇{{item[59][1].zzt}},[{{item[59][1].ksjc}}-{{item[59][1].jsjc}}节]◇{{item[59][1].jsxm}}◇{{item[59][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[70].length === 0"></td>
                  <td rowspan="2" v-else-if="item[70].length === 1">
                    {{item[70][0].kcmc}}◇{{item[70][0].zzt}},[{{item[70][0].ksjc}}-{{item[70][0].jsjc}}节]◇{{item[70][0].jsxm}}◇{{item[70][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[70][0].kcmc}}◇{{item[70][0].zzt}},[{{item[70][0].ksjc}}-{{item[70][0].jsjc}}节]◇{{item[70][0].jsxm}}◇{{item[70][0].skjsmc}}<br><br>
                    {{item[70][1].kcmc}}◇{{item[70][1].zzt}},[{{item[70][1].ksjc}}-{{item[70][1].jsjc}}节]◇{{item[70][1].jsxm}}◇{{item[70][1].skjsmc}}
                  </td>
                </tr>
                <tr>
                  <td class="thead-td">第六节</td>
                </tr>
                <tr>
                  <td class="thead-td">第七节</td>

                  <td rowspan="2" v-if="item[6].length === 0"></td>
                  <td rowspan="2" v-else-if="item[6].length === 1">
                    {{item[6][0].kcmc}}◇{{item[6][0].zzt}},[{{item[6][0].ksjc}}-{{item[6][0].jsjc}}节]◇{{item[6][0].jsxm}}◇{{item[6][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[6][0].kcmc}}◇{{item[6][0].zzt}},[{{item[6][0].ksjc}}-{{item[6][0].jsjc}}节]◇{{item[6][0].jsxm}}◇{{item[6][0].skjsmc}}<br><br>
                    {{item[6][1].kcmc}}◇{{item[6][1].zzt}},[{{item[6][1].ksjc}}-{{item[6][1].jsjc}}节]◇{{item[6][1].jsxm}}◇{{item[6][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[17].length === 0"></td>
                  <td rowspan="2" v-else-if="item[17].length === 1">
                    {{item[17][0].kcmc}}◇{{item[17][0].zzt}},[{{item[17][0].ksjc}}-{{item[17][0].jsjc}}节]◇{{item[17][0].jsxm}}◇{{item[17][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[17][0].kcmc}}◇{{item[17][0].zzt}},[{{item[17][0].ksjc}}-{{item[17][0].jsjc}}节]◇{{item[17][0].jsxm}}◇{{item[17][0].skjsmc}}<br><br>
                    {{item[17][1].kcmc}}◇{{item[17][1].zzt}},[{{item[17][1].ksjc}}-{{item[17][1].jsjc}}节]◇{{item[17][1].jsxm}}◇{{item[17][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[28].length === 0"></td>
                  <td rowspan="2" v-else-if="item[28].length === 1">
                    {{item[28][0].kcmc}}◇{{item[28][0].zzt}},[{{item[28][0].ksjc}}-{{item[28][0].jsjc}}节]◇{{item[28][0].jsxm}}◇{{item[28][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[28][0].kcmc}}◇{{item[28][0].zzt}},[{{item[28][0].ksjc}}-{{item[28][0].jsjc}}节]◇{{item[28][0].jsxm}}◇{{item[28][0].skjsmc}}<br><br>
                    {{item[28][1].kcmc}}◇{{item[28][1].zzt}},[{{item[28][1].ksjc}}-{{item[28][1].jsjc}}节]◇{{item[28][1].jsxm}}◇{{item[28][1].skjsmc}}
                  </td>

                   <td rowspan="2" v-if="item[39].length === 0"></td>
                  <td rowspan="2" v-else-if="item[39].length === 1">
                    {{item[39][0].kcmc}}◇{{item[39][0].zzt}},[{{item[39][0].ksjc}}-{{item[39][0].jsjc}}节]◇{{item[39][0].jsxm}}◇{{item[39][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[39][0].kcmc}}◇{{item[39][0].zzt}},[{{item[39][0].ksjc}}-{{item[39][0].jsjc}}节]◇{{item[39][0].jsxm}}◇{{item[39][0].skjsmc}}<br><br>
                    {{item[39][1].kcmc}}◇{{item[39][1].zzt}},[{{item[39][1].ksjc}}-{{item[39][1].jsjc}}节]◇{{item[39][1].jsxm}}◇{{item[39][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[50].length === 0"></td>
                  <td rowspan="2" v-else-if="item[50].length === 1">
                    {{item[50][0].kcmc}}◇{{item[50][0].zzt}},[{{item[50][0].ksjc}}-{{item[50][0].jsjc}}节]◇{{item[50][0].jsxm}}◇{{item[50][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[50][0].kcmc}}◇{{item[50][0].zzt}},[{{item[50][0].ksjc}}-{{item[50][0].jsjc}}节]◇{{item[50][0].jsxm}}◇{{item[50][0].skjsmc}}<br><br>
                    {{item[50][1].kcmc}}◇{{item[50][1].zzt}},[{{item[50][1].ksjc}}-{{item[50][1].jsjc}}节]◇{{item[50][1].jsxm}}◇{{item[50][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[61].length === 0"></td>
                  <td rowspan="2" v-else-if="item[61].length === 1">
                    {{item[61][0].kcmc}}◇{{item[61][0].zzt}},[{{item[61][0].ksjc}}-{{item[61][0].jsjc}}节]◇{{item[61][0].jsxm}}◇{{item[61][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[61][0].kcmc}}◇{{item[61][0].zzt}},[{{item[61][0].ksjc}}-{{item[61][0].jsjc}}节]◇{{item[61][0].jsxm}}◇{{item[61][0].skjsmc}}<br><br>
                    {{item[61][1].kcmc}}◇{{item[61][1].zzt}},[{{item[61][1].ksjc}}-{{item[61][1].jsjc}}节]◇{{item[61][1].jsxm}}◇{{item[61][1].skjsmc}}
                  </td>

                  <td rowspan="2" v-if="item[72].length === 0"></td>
                  <td rowspan="2" v-else-if="item[72].length === 1">
                    {{item[72][0].kcmc}}◇{{item[72][0].zzt}},[{{item[72][0].ksjc}}-{{item[72][0].jsjc}}节]◇{{item[72][0].jsxm}}◇{{item[72][0].skjsmc}}
                  </td>
                  <td rowspan="2" v-else>
                    {{item[72][0].kcmc}}◇{{item[72][0].zzt}},[{{item[72][0].ksjc}}-{{item[72][0].jsjc}}节]◇{{item[72][0].jsxm}}◇{{item[72][0].skjsmc}}<br><br>
                    {{item[72][1].kcmc}}◇{{item[72][1].zzt}},[{{item[72][1].ksjc}}-{{item[72][1].jsjc}}节]◇{{item[72][1].jsxm}}◇{{item[72][1].skjsmc}}
                  </td>
                </tr>
                <tr>
                  <td class="thead-td">第八节</td>
                </tr>
                <tr>
                  <td rowspan="3" class="thead-td">晚上</td>
                  <td class="thead-td">第九节</td>

                  <td rowspan="3" v-if="item[8].length === 0"></td>
                  <td rowspan="3" v-else-if="item[8].length === 1">
                    {{item[8][0].kcmc}}◇{{item[8][0].zzt}},[{{item[8][0].ksjc}}-{{item[8][0].jsjc}}节]◇{{item[8][0].jsxm}}◇{{item[8][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[8][0].kcmc}}◇{{item[8][0].zzt}},[{{item[8][0].ksjc}}-{{item[8][0].jsjc}}节]◇{{item[8][0].jsxm}}◇{{item[8][0].skjsmc}}<br><br>
                    {{item[8][1].kcmc}}◇{{item[8][1].zzt}},[{{item[8][1].ksjc}}-{{item[8][1].jsjc}}节]◇{{item[8][1].jsxm}}◇{{item[8][1].skjsmc}}
                  </td>

                  <td rowspan="3" v-if="item[19].length === 0"></td>
                  <td rowspan="3" v-else-if="item[19].length === 1">
                    {{item[19][0].kcmc}}◇{{item[19][0].zzt}},[{{item[19][0].ksjc}}-{{item[19][0].jsjc}}节]◇{{item[19][0].jsxm}}◇{{item[19][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[19][0].kcmc}}◇{{item[19][0].zzt}},[{{item[19][0].ksjc}}-{{item[19][0].jsjc}}节]◇{{item[19][0].jsxm}}◇{{item[19][0].skjsmc}}<br><br>
                    {{item[19][1].kcmc}}◇{{item[19][1].zzt}},[{{item[19][1].ksjc}}-{{item[19][1].jsjc}}节]◇{{item[19][1].jsxm}}◇{{item[19][1].skjsmc}}
                  </td>

                  <td rowspan="3" v-if="item[30].length === 0"></td>
                  <td rowspan="3" v-else-if="item[30].length === 1">
                    {{item[30][0].kcmc}}◇{{item[30][0].zzt}},[{{item[30][0].ksjc}}-{{item[30][0].jsjc}}节]◇{{item[30][0].jsxm}}◇{{item[30][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[30][0].kcmc}}◇{{item[30][0].zzt}},[{{item[30][0].ksjc}}-{{item[30][0].jsjc}}节]◇{{item[30][0].jsxm}}◇{{item[30][0].skjsmc}}<br><br>
                    {{item[30][1].kcmc}}◇{{item[30][1].zzt}},[{{item[30][1].ksjc}}-{{item[30][1].jsjc}}节]◇{{item[30][1].jsxm}}◇{{item[30][1].skjsmc}}
                  </td>

                  <td rowspan="3" v-if="item[41].length === 0"></td>
                  <td rowspan="3" v-else-if="item[41].length === 1">
                    {{item[41][0].kcmc}}◇{{item[41][0].zzt}},[{{item[41][0].ksjc}}-{{item[41][0].jsjc}}节]◇{{item[41][0].jsxm}}◇{{item[41][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[41][0].kcmc}}◇{{item[41][0].zzt}},[{{item[41][0].ksjc}}-{{item[41][0].jsjc}}节]◇{{item[41][0].jsxm}}◇{{item[41][0].skjsmc}}<br><br>
                    {{item[41][1].kcmc}}◇{{item[41][1].zzt}},[{{item[41][1].ksjc}}-{{item[41][1].jsjc}}节]◇{{item[41][1].jsxm}}◇{{item[41][1].skjsmc}}
                  </td>

                  <td rowspan="3" v-if="item[52].length === 0"></td>
                  <td rowspan="3" v-else-if="item[52].length === 1">
                    {{item[52][0].kcmc}}◇{{item[52][0].zzt}},[{{item[52][0].ksjc}}-{{item[52][0].jsjc}}节]◇{{item[52][0].jsxm}}◇{{item[52][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[52][0].kcmc}}◇{{item[52][0].zzt}},[{{item[52][0].ksjc}}-{{item[52][0].jsjc}}节]◇{{item[52][0].jsxm}}◇{{item[52][0].skjsmc}}<br><br>
                    {{item[52][1].kcmc}}◇{{item[52][1].zzt}},[{{item[52][1].ksjc}}-{{item[52][1].jsjc}}节]◇{{item[52][1].jsxm}}◇{{item[52][1].skjsmc}}
                  </td>

                  <td rowspan="3" v-if="item[63].length === 0"></td>
                  <td rowspan="3" v-else-if="item[63].length === 1">
                    {{item[63][0].kcmc}}◇{{item[63][0].zzt}},[{{item[63][0].ksjc}}-{{item[63][0].jsjc}}节]◇{{item[63][0].jsxm}}◇{{item[63][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[63][0].kcmc}}◇{{item[63][0].zzt}},[{{item[63][0].ksjc}}-{{item[63][0].jsjc}}节]◇{{item[63][0].jsxm}}◇{{item[63][0].skjsmc}}<br><br>
                    {{item[63][1].kcmc}}◇{{item[63][1].zzt}},[{{item[63][1].ksjc}}-{{item[63][1].jsjc}}节]◇{{item[63][1].jsxm}}◇{{item[63][1].skjsmc}}
                  </td>

                   <td rowspan="3" v-if="item[74].length === 0"></td>
                  <td rowspan="3" v-else-if="item[74].length === 1">
                    {{item[74][0].kcmc}}◇{{item[74][0].zzt}},[{{item[74][0].ksjc}}-{{item[74][0].jsjc}}节]◇{{item[74][0].jsxm}}◇{{item[74][0].skjsmc}}
                  </td>
                  <td rowspan="3" v-else>
                    {{item[74][0].kcmc}}◇{{item[74][0].zzt}},[{{item[74][0].ksjc}}-{{item[74][0].jsjc}}节]◇{{item[74][0].jsxm}}◇{{item[74][0].skjsmc}}<br><br>
                    {{item[74][1].kcmc}}◇{{item[74][1].zzt}},[{{item[74][1].ksjc}}-{{item[74][1].jsjc}}节]◇{{item[74][1].jsxm}}◇{{item[74][1].skjsmc}}
                  </td>
                </tr>
                <tr>
                  <td class="thead-td">第十节</td>
                </tr>
                <tr>
                  <td class="thead-td">第十一节</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <div class="bottom">
        <span class="return" @click="_back">返回</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
window.$ = window.jQuery = require("jquery");
import axios from "axios";
const first = 1;
export default {
  name: "class",
  data() {
    return {
      year: null, // 起始时间
      term: null, // 结束时间
      time: null,
      data: {},
      name: {},
      item: [],
      callbacktime: []
    };
  },
  beforeCreate() {
    let _this = this;
    if (_this.first = 1) {
      $.ajax({
        type: "POST",
        url: _this.GLOBAL.URL+"/subject/findSubjectJsonP.action",
        data: { XH: this.$route.query.xgh },
        dataType: "jsonp",
        async: true,
        jsonp: "jsonpCallback",
        success: function(res) {
          const data = res.data;
          if (data) {
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < data[i].length; j++) {
                _this.item.push(data[i][j]);
              }
            }
          }
          _this.first++;
        },
        error: function() {
          console.log("获取失败");
        }
      });
    }
    $.ajax({
      type: "POST",
      url: _this.GLOBAL.URL+"/subject/findXNJonP.action",
      dataType: "jsonp",
      async: true,
      jsonp: "jsonpCallback",
      success: function(res) {
        _this.callbacktime = res.data;
      },
      error: function() {
        console.log("获取失败");
      }
    });
  },
  methods: {
    _back() {
      this.$router.go(-1);
    },
    _submit() {
      // 获取到用户输入的学年
      this.year = this.$refs.year.value;
      // 获取到用户输入的学期
      this.term = this.$refs.term.value;
      //将用户输入的学年跟学期进行拼接
      this.time = this.year + this.term;
      // console.log(this.time);
      //调用ajax请求然后把拼接好的字符传递过去
      let _this = this;
      this.item = [];
      $.ajax({
        type: "POST",
        url: _this.GLOBAL.URL+"/subject/findSubjectJsonP.action",
        data: { XH: this.$route.query.xgh, XQDM: this.time },
        dataType: "jsonp",
        async: true,
        jsonp: "jsonpCallback",
        success: function(res) {
          const data = res.data;
          if (data) {
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < data[i].length; j++) {
                _this.item.push(data[i][j]);
              }
            }
          }
          _this.first++;
          console.log("点击打印" + _this.first);
        },
        error: function() {
          console.log("获取失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.class .bg {
  width: 100%;
  height: 160px;
  background: #135677;
  position: absolute;
  left: 0;
}
.card .loading{
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.class .title {
  display: block;
  margin-left: 54px;
  height: 70px;
  line-height: 70px;
  color: white;
  font-size: 62px;
  font-family: JLH;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke: 2px #fff;
}
.class .center {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 80px;
  margin-left: 54px;
  bottom: 160px;
  width: 90%;
  background: #fff;
  box-shadow: 1px 13px 25px #949494;
}
.class .menu-class {
  flex: 0 0 134px;
  width: 134px;
}
.class .menu {
  font-size: 16px;
  font-weight: 700;
  color: #a1a19c;
  font-family: SimHei;
}
.class .menu .avator {
  margin: 5px 0 3px 25px;
}
.class .menu .name {
  display: block;
  text-align: center;
}
.class .detailed span {
  color: #186d92;
  font-size: 25px;
  font-family: SimHei;
  display: block;
  box-shadow: -6px 0px 18px #949494;
  margin-left: 13px;
  margin-top: 30px;
  background: white;
  position: absolute;
  width: 122px;
  height: 30px;
  line-height: 30px;
}
.class .wapper-class {
  flex: 1;
  box-shadow: -2px 0px 10px #949494;
}
.class .wapper-class h1 {
  color: #a1a19c;
  font-size: 25px;
  font-family: SimHei;
  font-weight: normal;
  margin: 30px 0 30px 35px;
  padding-left: 6px;
  box-shadow: -5px 0px 0px #186d92;
}
.class .search-class {
  color: #a1a19c;
  margin: 0 0 30px 35px;
  font-weight: 700;
  height: 16px;
}
.class .search {
  font-size: 16px;
  box-shadow: -5px 0px 0px #186d92;
  padding-left: 9px;
}
.class .term {
  border: 1px solid #a1a19c;
  margin-top: -4px;
}
.class .btn-class {
  height: 21px;
  width: 45px;
  background: #fff;
  border: 1px solid #a1a19c;
  border-radius: 5px;
  margin-top: -4px;
}
.class-table {
  width: 95%;
  border-color: #ccc;
  margin: 0 30px;
}
.thead th {
  text-align: center;
  font-size: 16px;
  width: 120px;
  height: 30px;
}
.thead .thead-th {
  width: 120px;
}
.tbody td {
  font-size: 14px;
  width: 120px;
  height: 45px;
  line-height: 20px;
}
.tbody .thead-td {
  text-align: center;
  width: 60px;
}
.class .bottom {
  position: absolute;
  width: 90%;
  height: 80px;
  background: #135677;
  bottom: 80px;
  margin-left: 54px;
}
.bottom .return {
  display: block;
  text-align: center;
  height: 80px;
  line-height: 80px;
  color: white;
  font-size: 62px;
  font-family: JLH;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke: 2px #fff;
  box-shadow: 0px 6px 21px #545454;
}
</style>