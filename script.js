var mainBgColor = "black";
        var rainbowText = false;
        var currentMode = "text";
        var currentLang = "english";

        document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('langSelect').style.display = 'none';
        });
        });
        document.getElementById('langDropdown').addEventListener('mouseover', function() {
        document.getElementById('langSelect').style.display = 'block';
        });
        document.getElementById('langDropdown').addEventListener('mouseleave', function() {
        document.getElementById('langSelect').style.display = 'none';
        });

        $("#langSelect").on("click", "a", function () {
            document.getElementById("dropTitle").innerHTML = this.innerHTML;

            if (this.innerHTML == "English") {
                document.getElementById("textmode").innerHTML = "Text Mode";
                document.getElementById("secondmode").innerHTML = "Seconds Mode";
                document.getElementById("lightmode").innerHTML = "Light Mode";
            }
            else {
                document.getElementById("textmode").innerHTML = "文字模式";
                document.getElementById("secondmode").innerHTML = "讀秒模式";
                document.getElementById("lightmode").innerHTML = "燈光模式";
            }

            changeMode(this.className);
        });

        $("#langDropdown").hover(function () {
            var english_option = document.getElementById('dropBtn1');
            var chinese_option = document.getElementById('dropBtn2');
            english_option.style.display = 'block';
            chinese_option.style.display = 'block';

            if (currentLang.toLowerCase() == "english") {
                english_option.style.display = 'none';
            }
            else {
                chinese_option.style.display = 'none';
            }
        });

        document.querySelectorAll('.color-content li').forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('colorSelect').style.display = 'none';
        });
        });
        document.getElementById('colorSelectCol').addEventListener('mouseover', function() {
        document.getElementById('colorSelect').style.display = 'block';
        });
        document.getElementById('colorSelectCol').addEventListener('mouseleave', function() {
        document.getElementById('colorSelect').style.display = 'none';
        });

        $("#backgroundButton").on("click", function () {
            document.getElementById("colorSelect").style.display = 'block';
            console.log("backgroundButton clicked!!!");
        });

        $("#colorSelect li").hover(function () {
            changeBackground(this.className);
        });

        $("#colorSelect").on("click", "li", function () {
            mainBgColor = this.className;
            changeBackground(this.className);
        });

        $("#colorSelectCol").hover(function () { changeToggleStatus(); },
            function () { changeToggleStatus(); changeBackground(mainBgColor); }
        );

        function changeToggleStatus() {
            $('#colorSelect').toggle('slow', function () { changeColor(); });
        }

        function changeBackground(colourClass) {
            $('#backgroundButton').removeAttr('class').addClass(colourClass);
            var element = document.body;
            element.classList.remove("red-mode", "orange-mode", "pink-mode", "purple-mode", "blue-mode", "white-mode", "black-mode");
            if (colourClass == "star") {
                rainbowText = true;
                $('#starAnim').removeAttr('class').addClass("star_anim");
            }
            else {
                rainbowText = false;
                $('#starAnim').removeAttr('class').addClass("star_anim_hide");

                if (colourClass == "black")
                    element.classList.add("black-mode");
                else if (colourClass == "white")
                    element.classList.add("white-mode");
                else if (colourClass == "red")
                    element.classList.add("red-mode");
                else if (colourClass == "orange")
                    element.classList.add("orange-mode");
                else if (colourClass == "pink")
                    element.classList.add("pink-mode");
                else if (colourClass == "purple")
                    element.classList.add("purple-mode");
                else if (colourClass == "blue")
                    element.classList.add("blue-mode");
            }

            const dropT = document.getElementById("dropTitle");
            const drop1 = document.getElementById("dropBtn1");
            const drop2 = document.getElementById("dropBtn2");
            if (colourClass == "white") {
                dropT.style.color = 'black';
                drop1.style.color = 'black';
                drop2.style.color = 'black';
            }
            else {
                dropT.style.color = 'white';
                drop1.style.color = 'white';
                drop2.style.color = 'white';
            }
        }

        //update the new colour
        function changeColor() {
            var p = $("#pink").val();
            var pur = $("#purple").val();
            var r = $("#red").val();
            var b = $("#blue").val();
            var g = $("#green").val();
            var o = $("#orange").val();
            var w = $("#white").val();
            var bl = $("#black").val();
            var s = $("#star").val();
        };

        //Main
        document.getElementById("dropTitle").innerHTML = "English";
        buildTable("english")
        setInterval(showTime, 1000);

        // Mode
        //Default text mode
        var textInterval;
        var secondInterval;
        var rainbowInterval;
        const textmode = document.getElementById("textmode");
        const secondmode = document.getElementById("secondmode");
        const lightmode = document.getElementById("lightmode");
        changeMode("text");

        function changeMode(mode) {
            if (mode !== "text" && mode !== "second" && mode !== "light") {
                buildTable(mode);
                this.currentLang = mode;
                mode = this.currentMode;
            }
            this.currentMode = mode;
            // console.log("Change mode");
            // console.log(this.currentMode);
            clearInterval(textInterval);
            clearInterval(secondInterval);
            clearInterval(rainbowInterval);
            clearLight();

            if (mode == "text") {
                // console.log("text mode");
                textInterval = setInterval(runText, 1000);
                textmode.className = "col lightUp";
                secondmode.className = "col modeText";
                lightmode.className = "col modeText";
            }
            else if (mode == "second") {
                // console.log("second mode");
                textmode.className = "col modeText";
                secondmode.className = "col lightUp";
                lightmode.className = "col modeText";
                secondInterval = setInterval(runSecond, 1000);
                // runSecond();
            }
            else if (mode == "light") {
                // console.log("light mode");
                textmode.className = "col modeText";
                secondmode.className = "col modeText";
                lightmode.className = "col lightUp";
                lightUp();
            }
        }

        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }

        function showTime() {
            // Get current time
            var d = new Date();
            var current_hour = addZero(d.getHours());
            var current_minute = addZero(d.getMinutes());
            var current_sec = addZero(d.getSeconds());

            const clock = document.getElementById("clock");
            clock.innerHTML = current_hour + ":" + current_minute + ":" + current_sec;
        }

        function buildTable(lang) {
            const mytable = document.getElementById("myTable");

            //delete row
            mytable.innerHTML = "";

            var alpahbet = '';
            if (lang == "english") {
                alpahbet = "ITLISASAMPMACQUARTERDCTWENTYFIVEXHALFSTENFTOPASTERUNINEONESIXTHREEFOURFIVETWOEIGHTELEVENSEVENTWELVETENSEOCLOCK";
            }
            else {
                alpahbet = "現在是時間晝上午下午夜十一點半四點五點半六八七點半一九點半四十五分四十分三十五分零五分七六二十五分二十分五十分五三點半六點十二點半點十點八點三十分一零五分六三五十五分二十五分整三四十五分五十分二十分二十分八四十分三十五分";
            }
            const alpahbet_split = alpahbet.split("");
            var tableRow1 = mytable.insertRow(0);
            var tableRow2 = mytable.insertRow(1);
            var tableRow3 = mytable.insertRow(2);
            var tableRow4 = mytable.insertRow(3);
            var tableRow5 = mytable.insertRow(4);
            var tableRow6 = mytable.insertRow(5);
            var tableRow7 = mytable.insertRow(6);
            var tableRow8 = mytable.insertRow(7);
            var tableRow9 = mytable.insertRow(8);
            var tableRow10 = mytable.insertRow(9);
            var tableRow11 = mytable.insertRow(10);
            var tableRow12 = mytable.insertRow(11);

            for (var i = 0; i <= 12; i++) {
                var cell = tableRow1.insertCell(i);
                if (i == 0) {
                    cell.innerHTML = "&#8226;";
                }
                else if (i == 12) {
                    cell.innerHTML = "&#8226;";
                }
                else {
                    cell.innerHTML = "";
                }
            }
            for (var i = 0; i <= 12; i++) {
                var cell = tableRow12.insertCell(i);
                if (i == 0) {
                    cell.innerHTML = "&#8226;";
                }
                else if (i == 12) {
                    cell.innerHTML = "&#8226;";
                }
                else {
                    cell.innerHTML = "";
                }
            }

            var j = 0;
            var itis = [0, 1, 3, 4];
            for (var i = 0; i <= alpahbet.length; i++) {
                if (i < 11) {

                    if (j == 0) {
                        var cell = tableRow2.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow2.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow2.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 11) j = 0;
                if (i >= 11 && i < 22) {
                    if (j == 0) {
                        var cell = tableRow3.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow3.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow3.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 22) j = 0;
                if (i >= 22 && i < 33) {
                    if (j == 0) {
                        var cell = tableRow4.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow4.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow4.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 33) j = 0;
                if (i >= 33 && i < 44) {
                    if (j == 0) {
                        var cell = tableRow5.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow5.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow5.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 44) j = 0;
                if (i >= 44 && i < 55) {
                    if (j == 0) {
                        var cell = tableRow6.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow6.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow6.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 55) j = 0;
                if (i >= 55 && i < 66) {
                    if (j == 0) {
                        var cell = tableRow7.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow7.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow7.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 66) j = 0;
                if (i >= 66 && i < 77) {
                    if (j == 0) {
                        var cell = tableRow8.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow8.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow8.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 77) j = 0;
                if (i >= 77 && i < 88) {
                    if (j == 0) {
                        var cell = tableRow9.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow9.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow9.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 88) j = 0;
                if (i >= 88 && i < 99) {
                    if (j == 0) {
                        var cell = tableRow10.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }
                    var cell = tableRow10.insertCell(j);
                    cell.innerHTML = alpahbet_split[i];
                    j++;
                    if (j == 12) {
                        var cell = tableRow10.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
                if (i == 99) j = 0;
                if (i >= 99 && i < 110) {
                    if (j == 0) {
                        var cell = tableRow11.insertCell(j);
                        cell.innerHTML = "";
                        j++;
                    }

                    var special_o = alpahbet_split[i];
                    if (j == 5 && lang == 'english')
                        special_o = "O'"
                    var cell = tableRow11.insertCell(j);
                    cell.innerHTML = special_o;
                    j++;
                    if (j == 12) {
                        var cell = tableRow11.insertCell(j);
                        cell.innerHTML = "";
                    }
                    continue;
                }
            }
        }

        function runText() {
            // Get current time
            clearLight();
            var d = new Date();
            var current_hour = d.getHours();
            var current_minute = d.getMinutes();

            if (current_minute < 5)
                current_minute = 0
            else if (current_minute < 10)
                current_minute = 5
            else if (current_minute < 15)
                current_minute = 10
            else if (current_minute < 20)
                current_minute = 15
            else if (current_minute < 25)
                current_minute = 20
            else if (current_minute < 30)
                current_minute = 25
            else if (current_minute < 35)
                current_minute = 30
            else if (current_minute < 40)
                current_minute = 35
            else if (current_minute < 45)
                current_minute = 40
            else if (current_minute < 50)
                current_minute = 45
            else if (current_minute < 55)
                current_minute = 50
            else if (current_minute < 60)
                current_minute = 55

            var row1_light = [];
            var row2_light = [];
            var row3_light = [];
            var row4_light = [];
            var row5_light = [];
            var row6_light = [];
            var row7_light = [];
            var row8_light = [];
            var row9_light = [];
            var row10_light = [];

            var past_def = [5, 10, 15, 20, 25, 30]
            var quater_def = [15, 45]
            var five_def = [5, 25, 35, 55]
            var ten_def = [10, 50]
            var twenty_def = [20, 25, 35, 40]
            var to_def = [35, 40, 45, 50, 55]

            //English row decoration
            if (this.currentLang == "english") {
                //row1 method
                row1_light.push.apply(row1_light, [1, 2, 4, 5]);
                if (current_hour >= 0 && current_hour <= 11)
                    row1_light.push.apply(row1_light, [8, 9]);
                else
                    row1_light.push.apply(row1_light, [10, 11]);
                //row2 method
                if (quater_def.includes(current_minute))
                    row2_light.push.apply(row2_light, [3, 4, 5, 6, 7, 8, 9]);
                //row3 method
                if (five_def.includes(current_minute))
                    row3_light.push.apply(row3_light, [7, 8, 9, 10]);
                if (twenty_def.includes(current_minute))
                    row3_light.push.apply(row3_light, [1, 2, 3, 4, 5, 6]);
                //row4 method
                if (ten_def.includes(current_minute))
                    row4_light.push.apply(row4_light, [6, 7, 8]);
                if (current_minute == 30)
                    row4_light.push.apply(row4_light, [1, 2, 3, 4]);
                if (to_def.includes(current_minute))
                    row4_light.push.apply(row4_light, [10, 11]);
                //row5 method
                if (current_hour == 9 || current_hour == 21)
                    row5_light.push.apply(row5_light, [8, 9, 10, 11]);
                if (past_def.includes(current_minute))
                    row5_light.push.apply(row5_light, [1, 2, 3, 4]);
                //row6 method
                if (current_hour == 1 || current_hour == 13)
                    row6_light.push.apply(row6_light, [1, 2, 3]);
                if (current_hour == 3 || current_hour == 15)
                    row6_light.push.apply(row6_light, [7, 8, 9, 10, 11]);
                if (current_hour == 6 || current_hour == 18)
                    row6_light.push.apply(row6_light, [4, 5, 6]);
                //row7 method
                if (current_hour == 2 || current_hour == 14)
                    row7_light.push.apply(row7_light, [9, 10, 11]);
                if (current_hour == 4 || current_hour == 16)
                    row7_light.push.apply(row7_light, [1, 2, 3, 4]);
                if (current_hour == 5 || current_hour == 17)
                    row7_light.push.apply(row7_light, [5, 6, 7, 8]);
                //row8 method
                if (current_hour == 8 || current_hour == 20)
                    row8_light.push.apply(row8_light, [1, 2, 3, 4, 5]);
                if (current_hour == 11 || current_hour == 23)
                    row8_light.push.apply(row8_light, [6, 7, 8, 9, 10, 11]);
                //row9 method
                if (current_hour == 7 || current_hour == 19)
                    row9_light.push.apply(row9_light, [1, 2, 3, 4, 5]);
                if (current_hour == 12 || current_hour == 0)
                    row9_light.push.apply(row9_light, [6, 7, 8, 9, 10, 11]);
                //row10 method
                if (current_hour == 10 || current_hour == 22)
                    row10_light.push.apply(row10_light, [1, 2, 3]);
                if (current_minute == 0)
                    row10_light.push.apply(row10_light, [6, 7, 8, 9, 10, 11]);

            }
            else {
                //row1 method
                row1_light.push.apply(row1_light, [1, 2, 4, 5]);
                if (current_hour >= 0 && current_hour <= 11)
                    row1_light.push.apply(row1_light, [7, 8]);
                else
                    row1_light.push.apply(row1_light, [9, 10]);

                if (current_hour == 1 || current_hour == 13)
                    row2_light.push.apply(row2_light, [2, 3]);
                if (current_hour == 2 || current_hour == 14)
                    row6_light.push.apply(row6_light, [8, 9]);
                if (current_hour == 3 || current_hour == 15)
                    row6_light.push.apply(row6_light, [2, 3]);
                if (current_hour == 4 || current_hour == 16)
                    row2_light.push.apply(row2_light, [5, 6]);
                if (current_hour == 5 || current_hour == 17)
                    row2_light.push.apply(row2_light, [7, 8]);
                if (current_hour == 6 || current_hour == 18)
                    row6_light.push.apply(row6_light, [5, 6]);
                if (current_hour == 7 || current_hour == 19)
                    row3_light.push.apply(row3_light, [1, 2]);
                if (current_hour == 8 || current_hour == 20)
                    row7_light.push.apply(row7_light, [3, 4]);
                if (current_hour == 9 || current_hour == 21)
                    row3_light.push.apply(row3_light, [5, 6]);
                if (current_hour == 10 || current_hour == 22)
                    row7_light.push.apply(row7_light, [1, 2]);
                if (current_hour == 11 || current_hour == 23)
                    row2_light.push.apply(row2_light, [1, 2, 3]);
                if (current_hour == 12 || current_hour == 0)
                    row6_light.push.apply(row6_light, [7, 8, 9]);

                if (current_minute == 0)
                    row8_light.push.apply(row8_light, [11]);
                if (current_minute == 5)
                    row8_light.push.apply(row8_light, [9, 10]);
                if (current_minute == 10)
                    row9_light.push.apply(row9_light, [7, 8]);
                if (current_minute == 15)
                    row8_light.push.apply(row8_light, [4, 5, 6]);
                if (current_minute == 20)
                    row9_light.push.apply(row9_light, [9, 10, 11]);
                if (current_minute == 25)
                    row8_light.push.apply(row8_light, [7, 8, 9, 10]);
                if (current_minute == 30)
                    row7_light.push.apply(row7_light, [5, 6, 7]);
                if (current_minute == 35)
                    row10_light.push.apply(row10_light, [8, 9, 10, 11]);
                if (current_minute == 40)
                    row10_light.push.apply(row10_light, [5, 6, 7]);
                if (current_minute == 45)
                    row9_light.push.apply(row9_light, [2, 3, 4, 5]);
                if (current_minute == 50)
                    row9_light.push.apply(row9_light, [6, 7, 8]);
                if (current_minute == 55)
                    row8_light.push.apply(row8_light, [3, 4, 5, 6]);
            }

            const mytable = document.getElementById("myTable");
            var j = 1;
            for (var i = 0; i <= 110; i++) {
                if (i < 11) {
                    var cell = mytable.rows[1].cells[j];
                    if (row1_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 11) j = 1;
                if (i >= 11 && i < 22) {
                    var cell = mytable.rows[2].cells[j];
                    if (row2_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 22) j = 1;
                if (i >= 22 && i < 33) {
                    var cell = mytable.rows[3].cells[j];
                    if (row3_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 33) j = 1;
                if (i >= 33 && i < 44) {
                    var cell = mytable.rows[4].cells[j];
                    if (row4_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 44) j = 1;
                if (i >= 44 && i < 55) {
                    var cell = mytable.rows[5].cells[j];
                    if (row5_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 55) j = 1;
                if (i >= 55 && i < 66) {
                    var cell = mytable.rows[6].cells[j];
                    if (row6_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 66) j = 1;
                if (i >= 66 && i < 77) {
                    var cell = mytable.rows[7].cells[j];
                    if (row7_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 77) j = 1;
                if (i >= 77 && i < 88) {
                    var cell = mytable.rows[8].cells[j];
                    if (row8_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 88) j = 1;
                if (i >= 88 && i < 99) {
                    var cell = mytable.rows[9].cells[j];
                    if (row9_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
                if (i == 99) j = 1;
                if (i >= 99 && i < 110) {
                    var cell = mytable.rows[10].cells[j];
                    if (row10_light.includes(j))
                        cell.className = 'lightUp';
                    else
                        cell.className = '';
                    j++;
                    continue;
                }
            }

            if (rainbowText) {
                var rainbow_list = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff", "#ff00ff", "#ff0080"];
                for (var i = 0; i < 12; i++) {
                    for (var j = 0; j <= 12; j++) {
                        if (j != 0 || j != 12)
                            if (mytable.rows[i].cells[j].className == "lightUp")
                                mytable.rows[i].cells[j].style.color = rainbow_list[j - 1];
                    }
                }
            }
            //DOTS
            var min1 = [1, 11, 21, 31, 41, 51, 6, 16, 26, 36, 46, 56];
            var min2 = [2, 12, 22, 32, 42, 52, 7, 17, 27, 37, 47, 57];
            var min3 = [3, 13, 23, 33, 43, 53, 8, 18, 28, 38, 48, 58];
            var min4 = [4, 14, 24, 34, 44, 54, 9, 19, 29, 39, 49, 59];

            var min_05 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            var realtime_min = d.getMinutes();
            if (min_05.includes(realtime_min)) {
                mytable.rows[0].cells[0].className = "";
                mytable.rows[0].cells[12].className = "";
                mytable.rows[11].cells[0].className = "";
                mytable.rows[11].cells[12].className = "";
            }
            else {
                if (min1.includes(realtime_min))
                    mytable.rows[0].cells[0].className = "lightUp";
                if (min2.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                }
                if (min3.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                    mytable.rows[11].cells[12].className = "lightUp";
                }
                if (min4.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                    mytable.rows[11].cells[0].className = "lightUp";
                    mytable.rows[11].cells[12].className = "lightUp";
                }
            }

        }

        function runSecond() {
            var d = new Date();
            var current_seconds = d.getSeconds();

            clearLight();

            var left_one = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

            if (current_seconds >= 1 && current_seconds <= 9) {
                if (current_seconds == 1)
                    one_second("normal");
                if (current_seconds == 2)
                    two_second("normal");
                if (current_seconds == 3)
                    three_second("normal");
                if (current_seconds == 4)
                    four_second("normal");
                if (current_seconds == 5)
                    five_second("normal");
                if (current_seconds == 6)
                    six_second("normal");
                if (current_seconds == 7)
                    seven_second("normal");
                if (current_seconds == 8)
                    eight_second("normal");
                if (current_seconds == 9)
                    nine_second("normal");
            }

            if (current_seconds >= 10 && current_seconds <= 19)
                one_second("left");
            if (current_seconds >= 20 && current_seconds <= 29)
                two_second("left");
            if (current_seconds >= 30 && current_seconds <= 39)
                three_second("left");
            if (current_seconds >= 40 && current_seconds <= 49)
                four_second("left");
            if (current_seconds >= 50 && current_seconds <= 59)
                five_second("left");

            if (current_seconds == 0) {
                six_second("left");
                zero_second("right");
            }

            var right_zero = [10, 20, 30, 40, 50];
            var right_one = [11, 21, 31, 41, 51];
            var right_two = [12, 22, 32, 42, 52];
            var right_three = [13, 23, 33, 43, 53];
            var right_four = [14, 24, 34, 44, 54];
            var right_five = [15, 25, 35, 45, 55];
            var right_six = [16, 26, 36, 46, 56];
            var right_seven = [17, 27, 37, 47, 57];
            var right_eight = [18, 28, 38, 48, 58];
            var right_nine = [19, 29, 39, 49, 59];

            if (right_zero.includes(current_seconds))
                zero_second("right");
            if (right_one.includes(current_seconds))
                one_second("right");
            if (right_two.includes(current_seconds))
                two_second("right");
            if (right_three.includes(current_seconds))
                three_second("right");
            if (right_four.includes(current_seconds))
                four_second("right");
            if (right_five.includes(current_seconds))
                five_second("right");
            if (right_six.includes(current_seconds))
                six_second("right");
            if (right_seven.includes(current_seconds))
                seven_second("right");
            if (right_eight.includes(current_seconds))
                eight_second("right");
            if (right_nine.includes(current_seconds))
                nine_second("right");

            const mytable = document.getElementById("myTable");
            if (rainbowText) {
                var rainbow_list = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff", "#ff00ff", "#ff0080"];
                for (var i = 0; i < 12; i++) {
                    for (var j = 0; j <= 12; j++) {
                        if (j != 0 || j != 12)
                            if (mytable.rows[i].cells[j].className == "lightUp")
                                mytable.rows[i].cells[j].style.color = rainbow_list[j - 1];
                    }
                }
            }

            //DOTS
            var min1 = [1, 11, 21, 31, 41, 51, 6, 16, 26, 36, 46, 56];
            var min2 = [2, 12, 22, 32, 42, 52, 7, 17, 27, 37, 47, 57];
            var min3 = [3, 13, 23, 33, 43, 53, 8, 18, 28, 38, 48, 58];
            var min4 = [4, 14, 24, 34, 44, 54, 9, 19, 29, 39, 49, 59];

            var min_05 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            var realtime_min = d.getMinutes();
            // const mytable = document.getElementById("myTable");
            if (min_05.includes(realtime_min)) {
                mytable.rows[0].cells[0].className = "";
                mytable.rows[0].cells[12].className = "";
                mytable.rows[11].cells[0].className = "";
                mytable.rows[11].cells[12].className = "";
            }
            else {
                if (min1.includes(realtime_min))
                    mytable.rows[0].cells[0].className = "lightUp";
                if (min2.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                }
                if (min3.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                    mytable.rows[11].cells[12].className = "lightUp";
                }
                if (min4.includes(realtime_min)) {
                    mytable.rows[0].cells[0].className = "lightUp";
                    mytable.rows[0].cells[12].className = "lightUp";
                    mytable.rows[11].cells[0].className = "lightUp";
                    mytable.rows[11].cells[12].className = "lightUp";
                }
            }
        }

        function one_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            for (var i = 3; i <= 9; i++) {
                mytable.rows[i].cells[6 + c].className = "lightUp";
            }

            mytable.rows[4].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function two_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";

            mytable.rows[4].cells[4 + c].className = "lightUp";
            mytable.rows[4].cells[8 + c].className = "lightUp";

            mytable.rows[5].cells[8 + c].className = "lightUp";

            mytable.rows[6].cells[7 + c].className = "lightUp";
            mytable.rows[7].cells[6 + c].className = "lightUp";
            mytable.rows[8].cells[5 + c].className = "lightUp";

            mytable.rows[9].cells[4 + c].className = "lightUp";
            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
            mytable.rows[9].cells[8 + c].className = "lightUp";
        }

        function three_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[4 + c].className = "lightUp";
            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";
            mytable.rows[3].cells[8 + c].className = "lightUp";

            mytable.rows[4].cells[7 + c].className = "lightUp";

            mytable.rows[5].cells[6 + c].className = "lightUp";

            mytable.rows[6].cells[7 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";
            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[8 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function four_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            for (var i = 3; i <= 9; i++) {
                mytable.rows[i].cells[7 + c].className = "lightUp";
            }
            mytable.rows[4].cells[6 + c].className = "lightUp";

            mytable.rows[5].cells[5 + c].className = "lightUp";

            mytable.rows[6].cells[4 + c].className = "lightUp";

            mytable.rows[7].cells[4 + c].className = "lightUp";
            mytable.rows[7].cells[5 + c].className = "lightUp";
            mytable.rows[7].cells[6 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";
        }

        function five_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[4 + c].className = "lightUp";
            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";
            mytable.rows[3].cells[8 + c].className = "lightUp";

            mytable.rows[4].cells[4 + c].className = "lightUp";

            mytable.rows[5].cells[4 + c].className = "lightUp";
            mytable.rows[5].cells[5 + c].className = "lightUp";
            mytable.rows[5].cells[6 + c].className = "lightUp";
            mytable.rows[5].cells[7 + c].className = "lightUp";

            mytable.rows[6].cells[8 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";

            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[8 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function six_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";

            mytable.rows[4].cells[5 + c].className = "lightUp";

            mytable.rows[5].cells[4 + c].className = "lightUp";

            mytable.rows[6].cells[4 + c].className = "lightUp";
            mytable.rows[6].cells[5 + c].className = "lightUp";
            mytable.rows[6].cells[6 + c].className = "lightUp";
            mytable.rows[6].cells[7 + c].className = "lightUp";

            mytable.rows[7].cells[4 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";

            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[8 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function seven_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[4 + c].className = "lightUp";
            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";
            mytable.rows[3].cells[8 + c].className = "lightUp";

            mytable.rows[4].cells[8 + c].className = "lightUp";

            mytable.rows[5].cells[7 + c].className = "lightUp";

            mytable.rows[6].cells[6 + c].className = "lightUp";

            mytable.rows[7].cells[5 + c].className = "lightUp";
            mytable.rows[8].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[5 + c].className = "lightUp";
        }

        function eight_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";

            mytable.rows[4].cells[4 + c].className = "lightUp";
            mytable.rows[4].cells[8 + c].className = "lightUp";

            mytable.rows[5].cells[4 + c].className = "lightUp";
            mytable.rows[5].cells[8 + c].className = "lightUp";

            mytable.rows[6].cells[5 + c].className = "lightUp";
            mytable.rows[6].cells[6 + c].className = "lightUp";
            mytable.rows[6].cells[7 + c].className = "lightUp";

            mytable.rows[7].cells[4 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";

            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[8 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function nine_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";

            mytable.rows[4].cells[4 + c].className = "lightUp";
            mytable.rows[4].cells[8 + c].className = "lightUp";

            mytable.rows[5].cells[4 + c].className = "lightUp";
            mytable.rows[5].cells[8 + c].className = "lightUp";

            mytable.rows[6].cells[5 + c].className = "lightUp";
            mytable.rows[6].cells[6 + c].className = "lightUp";
            mytable.rows[6].cells[7 + c].className = "lightUp";
            mytable.rows[6].cells[8 + c].className = "lightUp";

            mytable.rows[7].cells[8 + c].className = "lightUp";

            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[7 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
        }

        function zero_second(mode) {
            const mytable = document.getElementById("myTable");
            var c = 0;
            if (mode == "left")
                c = -3;
            else if (mode == "right")
                c = + 3;

            mytable.rows[3].cells[5 + c].className = "lightUp";
            mytable.rows[3].cells[6 + c].className = "lightUp";
            mytable.rows[3].cells[7 + c].className = "lightUp";

            mytable.rows[4].cells[4 + c].className = "lightUp";
            mytable.rows[4].cells[8 + c].className = "lightUp";

            mytable.rows[5].cells[4 + c].className = "lightUp";
            mytable.rows[5].cells[8 + c].className = "lightUp";

            mytable.rows[6].cells[4 + c].className = "lightUp";
            mytable.rows[6].cells[8 + c].className = "lightUp";

            mytable.rows[7].cells[4 + c].className = "lightUp";
            mytable.rows[7].cells[8 + c].className = "lightUp";

            mytable.rows[8].cells[4 + c].className = "lightUp";
            mytable.rows[8].cells[8 + c].className = "lightUp";

            mytable.rows[9].cells[5 + c].className = "lightUp";
            mytable.rows[9].cells[6 + c].className = "lightUp";
            mytable.rows[9].cells[7 + c].className = "lightUp";
        }

        function clearLight() {
            const mytable = document.getElementById("myTable");
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j <= 12; j++) {
                    mytable.rows[i].cells[j].className = "";
                    mytable.rows[i].cells[j].style.color = "";
                }
            }
        }

        function lightUp() {
            //red,orange,yellow,chartreuse,green,spring green, cyan, dodger blue, purple, violet, magenta
            var rainbow_list = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff", "#ff00ff", "#ff0080"];
            const mytable = document.getElementById("myTable");
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j <= 12; j++) {
                    mytable.rows[i].cells[j].className = "lightUpHover";
                    if (rainbowText) {
                        if (j != 0 || j != 12)
                            mytable.rows[i].cells[j].style.color = rainbow_list[j - 1];
                    }
                }
            }
            runRainbow(mytable, rainbow_list);
        }

        function clearRainbow(mytable, rainbow_list) {
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j <= 12; j++) {
                    mytable.rows[i].cells[j].className = "lightUpHover";
                    if (j != 0 || j != 12)
                        mytable.rows[i].cells[j].style.color = rainbow_list[j - 1];
                }
            }
        }

        function runRainbow(mytable, rainbow_list) {

            //color
            if (rainbowText) {
                for (var i = 0; i < 12; i++) {
                    for (var j = 0; j <= 12; j++) {
                        if (j != 0 || j != 12)
                            mytable.rows[i].cells[j].style.color = rainbow_list[j - 1];
                    }
                }
            }


            var count = 0;
            var s = 0;
            var sp = 0;
            var mode = "forward";

            function test() {
                if (rainbowText)
                    clearRainbow(mytable, rainbow_list);
                else
                    clearLight();

                //45 degree
                if (count <= 11) {
                    s = count;
                    for (var j = 0; j <= count; j++) {
                        if (count == 1)
                            continue;
                        mytable.rows[j].cells[s].className = "lightUpZoom";
                        s--;
                        if (count > 11) {
                            break;
                        }
                    }
                }


                if (count > 11) {
                    var c = 12;

                    for (var j = sp; j <= 11; j++) {
                        if (count == 22)
                            continue;
                        mytable.rows[j].cells[c].className = "lightUpZoom";
                        c--;
                    }
                    if (mode == "forward")
                        sp++;
                    else
                        sp--;
                }

                if (mode == "forward")
                    count++;
                else
                    count--;

                if (count == 23) {
                    mode = "backward";
                }
                if (count == 0) {
                    mode = "forward";
                    count = 0;
                    sp = 0;
                }
            }

            rainbowInterval = setInterval(test, 150);
        }