// Lớp 10. Chương 7, Bài 2. Giải bất phương trình bậc hai một ẩn.

// 1. TRẮC NGHIỆM GIẢI BẤT PHƯƠNG TRÌNH BẬC HAI.
// 2. TẬP XÁC ĐỊNH HÀM SỐ CÓ CĂN VỚI 2 NGHIỆM.
// 3. TẬP XÁC ĐỊNH HÀM SỐ CÓ CĂN 1 NGHIỆM.
// 4. TÌM THAM SỐ M ĐỂ PHƯƠNG TRÌNH CÓ 2 NGHIỆM PHÂN BIỆT, VÔ NGHIỆM, NGHIỆM KÉP DẠNG Ax^2 + (Mm+N)x + C = 0.


function taoTamThucBacHai(yeuCau){ // tạo tam thức bậc hai với tham số là số nghiệm yêu cầu.
    let x1=new Fraction(1,1), x2 = new Fraction(1,1);
    let soNghiem=-1;
    let a=1, b=1, c=1;
    while (soNghiem!=yeuCau){
        a=(Math.round(Math.random()*10)+1)*randomSign();// a khác 0.
        b=(Math.round(Math.random()*40))*randomSign();
        c=(Math.round(Math.random()*80))*randomSign();
        let uocChung = gcd(a,gcd(b,c));
        a=a/uocChung;
        b=b/uocChung;
        c=c/uocChung;

        let Delta=b*b-4*a*c;

        if (Delta >0){
            Delta = Math.sqrt(Delta);
            if (Delta===Math.round(Delta)){
                if (2*a >0) {// sắp nghiệm nhỏ đi trước.
                    x1 = new Fraction(( -b - Delta ) , ( 2*a ));
                    x2 = new Fraction(( -b + Delta ) , ( 2*a ));
                }else{
                    x1 = new Fraction(( -b + Delta ) , ( 2*a ));
                    x2 = new Fraction(( -b - Delta ) , ( 2*a ));
                }
                soNghiem =2;
            }
        }else{
            if (Delta===0){
                x1=x2=new Fraction( -b , (2*a));
                soNghiem=1;
            }else{
                soNghiem=0;      
            }
        }
    }
    return [a,b,c,x1,x2,soNghiem];
}

// 1. TRẮC NGHIỆM GIẢI BẤT PHƯƠNG TRÌNH BẬC HAI.
function taoTracNghiem_BatPhuongTrinhBacHai2Nghiem(){
    let eq = taoTamThucBacHai(2);
    let dau = "";
    switch (Math.floor(Math.random()*4)) {
        case 0:
            dau = "<"; // âm
            break;
        case 1:
            dau = ">"; // dương
            break;
        case 2:
            dau = "\\geq"; // không âm
            break;
        case 3:
            dau = "\\leq"; // không dương
            break;
    }

    function ghiBatPhuongTrinhBacHai(A, B, C, dau){
        let a = Math.floor(Math.random()*10)*randomSign();
        let b = Math.floor(Math.random()*10)*randomSign();
        let c = Math.floor(Math.random()*10)*randomSign();
        let d = A - a;
        let e = B - b;
        let f = C - c;
        let string = ``;
        // ghi vế trái
        if (a!=0){
            string +=trinomial(a,b,c);
        }else{
            if (b!=0){
                string += binomial(b,c);
            }else{
                string +=`${c}`;
            }
        }
        // ghi dấu
        string +=`${dau} `;
        // ghi vế phải
        if (d!=0){
            string +=trinomial(d,e,f);
        }else{
            if (e!=0){
                string += binomial(e,f);
            }else{
                string +=`${f}`;
            }
        }
        return string;
    }
    content.innerHTML = `Tìm tập nghiệm của bất phương trình sau:`;
    equation.innerHTML = katex.renderToString(`${ghiBatPhuongTrinhBacHai(eq[0],eq[1],eq[2],dau)}`);

    //tạo các lựa chọn.
    let choices = [];

    choices.push(katex.renderToString( `\\left( -\\infty;${ghiPhanSo(eq[3])} \\right) \\cup \\left( ${ghiPhanSo(eq[4])};+\\infty \\right)` ));  // âm hoặc dương
    choices.push(katex.renderToString( `\\left( ${ghiPhanSo(eq[3])} ; ${ghiPhanSo(eq[4])} \\right)` ));                                         // âm hoặc dương
    choices.push(katex.renderToString( `\\left( -\\infty;${ghiPhanSo(eq[3])} \\right] \\cup \\left[ ${ghiPhanSo(eq[4])};+\\infty \\right)` ));  // không âm, không dương
    choices.push(katex.renderToString( `\\left[ ${ghiPhanSo(eq[3])} ; ${ghiPhanSo(eq[4])} \\right]` ));                                         // không âm, không dương
    // hết tạo lựa chọn.

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.

    // hiện đáp án ra.
    choicesElement.innerHTML = '';
    let i=0;

    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }
    // hết hiện đáp án.

    // người dùng chọn đáp án nào thì đáp án đó xanh lá, các đáp án khác về bình thường.
    let userChoice=[];
    let userChoiceIndex=0; // biến lưu thứ tự câu người dùng chọn
    for (let a=0 ; a<4 ; a++){
        userChoice.push(document.getElementById('choice'+a));
        userChoice[a].addEventListener('click', () => {
            userChoice[a].classList.add('userchoice');
            userChoiceIndex=a+1; //lấy thứ tự câu người dùng chọn
            for (let i=0 ; i<4 ; i++){
                if (i!=a){
                    userChoice[i].classList.remove('userchoice');
                }
            }
        });
    }

    // tính chỉ số cho đáp án đúng.
    let kieuXetDau=0;// gán giá trị cho kiểu xét dấu.
    switch (dau) {
        case '<':
            kieuXetDau=1;
            break;
        case '>':
            kieuXetDau=0;
        case '\\geq':
            kieuXetDau=3;
            break;
        case '\\leq':
            kieuXetDau =4;
            break;
    }

    let dauHeSo=0 // gán giá trị cho dấu hệ số a là eq[0]
    if (eq[0]<0){ 
        dauHeSo=1;
    }

    let cauDung = kieuXetDau+dauHeSo; // tìm chỉ số của câu đúng.
    if (cauDung===3 || cauDung===5) {// câu 3 đúng . index 2.
        cauDung =2;
    }else{
        if (cauDung===4){ // câu 4 đúng . index 3.
            cauDung=3;
        }
    }
    // lấy chỉ số câu đúng sau khi trộn.
    cauDung = map.indexOf(cauDung);
    // hết lấy chỉ số đáp án đúng.

    // gán câu đúng.
    const correctChoice = document.getElementById(`choice${cauDung}`); // chỉ số của lựa chọn đúng tích nghiệm.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');
        }
    });
}
// HẾT HÀM 1.

// 2. TẬP XÁC ĐỊNH HÀM SỐ CÓ CĂN VỚI 2 NGHIỆM.
function taoTracNghiem_TapXacDinhHamSoCoCan2Nghiem(){
    let eq=taoTamThucBacHai(2);// tạo tam thức bậc hai dưới dấu căn.
    // tạo các biểu thức gây nhiễu
    let a = Math.floor(Math.random()*10);
    let b = Math.floor(Math.random()*30);
    let c = Math.floor(Math.random()*50);
    let d = Math.floor(Math.random()*30);
    let e = Math.floor(Math.random()*30);
    let laPhanSo = Math.floor(Math.random()*2); // 0 là không, 1 là dưới căn
    let dauCuaCan = Math.floor(Math.random()*2); // 0 là + 1 là -
    
    content.innerHTML = `Tìm tập xác định của hàm số sau:`;

    // tạo biểu thức cho hàm số
    let bieuThuc = ``;
    if (a!=0){
        bieuThuc += trinomial(a,b,c);
    }else{
        if (b!=0){
            bieuThuc += binomial(b,c);
        }else{
            bieuThuc += `${c}`;
        }
    }
    if (dauCuaCan === 0){
        bieuThuc += `+`;
    }else{
        bieuThuc += `-`;
    }
    if (laPhanSo ===0){
        bieuThuc += `\\sqrt{ ${ trinomial( eq[0],eq[1],eq[2] ) } }`;
    }else{
        bieuThuc += `\\dfrac{ `;
        if (d!=0){
            bieuThuc += `${binomial(d,e)}`;
        }else{
            bieuThuc += `${e}`;
        }
        bieuThuc += `}{ \\sqrt{ ${ trinomial( eq[0],eq[1],eq[2] ) } } }`;
    }

    // ghi hàm số bằng biểu thức đã tạo.
    equation.innerHTML = katex.renderToString(`f(x) = ${bieuThuc}`);

    //tạo các lựa chọn.
    let choices = [];

    choices.push(katex.renderToString( `\\left( -\\infty;${ghiPhanSo(eq[3])} \\right) \\cup \\left( ${ghiPhanSo(eq[4])};+\\infty \\right)` ));  // 0. âm hoặc dương
    choices.push(katex.renderToString( `\\left( ${ghiPhanSo(eq[3])} ; ${ghiPhanSo(eq[4])} \\right)` ));                                         // 1. âm hoặc dương
    choices.push(katex.renderToString( `\\left( -\\infty;${ghiPhanSo(eq[3])} \\right] \\cup \\left[ ${ghiPhanSo(eq[4])};+\\infty \\right)` ));  // 2. không âm, không dương
    choices.push(katex.renderToString( `\\left[ ${ghiPhanSo(eq[3])} ; ${ghiPhanSo(eq[4])} \\right]` ));                                         // 3. không âm, không dương
    // hết tạo lựa chọn.

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.

    // hiện đáp án ra.
    choicesElement.innerHTML = '';
    let i=0;

    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }
    // hết hiện đáp án.

    // người dùng chọn đáp án nào thì đáp án đó xanh lá, các đáp án khác về bình thường.
    let userChoice=[];
    let userChoiceIndex=0; // biến lưu thứ tự câu người dùng chọn
    for (let a=0 ; a<4 ; a++){
        userChoice.push(document.getElementById('choice'+a));
        userChoice[a].addEventListener('click', () => {
            userChoice[a].classList.add('userchoice');
            userChoiceIndex=a+1; //lấy thứ tự câu người dùng chọn
            for (let i=0 ; i<4 ; i++){
                if (i!=a){
                    userChoice[i].classList.remove('userchoice');
                }
            }
        });
    }

    // tính chỉ số cho đáp án đúng.
    let cauDung = 0;
    if ( laPhanSo===0){
        if (eq[0] >0){
            cauDung = 2;
        }else{
            cauDung = 3;
        }
    }else{
        if (eq[0]<0){
            cauDung = 1;
        }
    }
    // lấy chỉ số câu đúng sau khi trộn.
    cauDung = map.indexOf(cauDung);
    // hết lấy chỉ số đáp án đúng.

    // gán câu đúng.
    const correctChoice = document.getElementById(`choice${cauDung}`); // chỉ số của lựa chọn đúng tích nghiệm.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');
        }
    });
}
// HẾT HÀM 2

// 3. TẬP XÁC ĐỊNH HÀM SỐ CÓ CĂN 1 NGHIỆM.
function taoTracNghiem_TapXacDinhHamSoCoCan1Nghiem(){
    let eq=taoTamThucBacHai(1);// tạo tam thức bậc hai dưới dấu căn.
    // tạo các biểu thức gây nhiễu
    let a = Math.floor(Math.random()*10);
    let b = Math.floor(Math.random()*30);
    let c = Math.floor(Math.random()*50);
    let d = Math.floor(Math.random()*30);
    let e = Math.floor(Math.random()*30);
    let laPhanSo = Math.floor(Math.random()*2); // 0 là không, 1 là dưới căn
    let dauCuaCan = Math.floor(Math.random()*2); // 0 là + 1 là -
    
    content.innerHTML = `Tìm tập xác định của hàm số sau:`;

    // tạo biểu thức cho hàm số
    let bieuThuc = ``;
    if (a!=0){
        bieuThuc += trinomial(a,b,c);
    }else{
        if (b!=0){
            bieuThuc += binomial(b,c);
        }else{
            bieuThuc += `${c}`;
        }
    }
    if (dauCuaCan === 0){
        bieuThuc += `+`;
    }else{
        bieuThuc += `-`;
    }
    if (laPhanSo ===0){
        bieuThuc += `\\sqrt{ ${ trinomial( eq[0],eq[1],eq[2] ) } }`;
    }else{
        bieuThuc += `\\dfrac{ `;
        if (d!=0){
            bieuThuc += `${binomial(d,e)}`;
        }else{
            bieuThuc += `${e}`;
        }
        bieuThuc += `}{ \\sqrt{ ${ trinomial( eq[0],eq[1],eq[2] ) } } }`;
    }

    // ghi hàm số bằng biểu thức đã tạo.
    equation.innerHTML = katex.renderToString(`f(x) = ${bieuThuc}`);

    //tạo các lựa chọn. CÓ 1 NGHIỆM NÊN x1 = x2.
    let choices = [];
    choices.push(katex.renderToString( `\\mathbb{R}\\setminus\\left\\{ ${ghiPhanSo(eq[3])} \\right\\}` ));   // 0. phân số, eq[0] dương.
    choices.push(katex.renderToString( ` \\varnothing` ));   // 1. phân số, eq[0] âm
    choices.push(katex.renderToString( `\\mathbb{R}` ));   // 2. không phân số, eq[0] dương
    choices.push(katex.renderToString( ` \\left\\{ ${ghiPhanSo(eq[3])} \\right\\} ` ));   // 3. không phân số, eq[0] âm.
    // hết tạo lựa chọn.

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.

    // hiện đáp án ra.
    choicesElement.innerHTML = '';
    let i=0;

    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }
    // hết hiện đáp án.

    // người dùng chọn đáp án nào thì đáp án đó xanh lá, các đáp án khác về bình thường.
    let userChoice=[];
    let userChoiceIndex=0; // biến lưu thứ tự câu người dùng chọn
    for (let a=0 ; a<4 ; a++){
        userChoice.push(document.getElementById('choice'+a));
        userChoice[a].addEventListener('click', () => {
            userChoice[a].classList.add('userchoice');
            userChoiceIndex=a+1; //lấy thứ tự câu người dùng chọn
            for (let i=0 ; i<4 ; i++){
                if (i!=a){
                    userChoice[i].classList.remove('userchoice');
                }
            }
        });
    }

    // tính chỉ số cho đáp án đúng.
    let cauDung = 0;
    if ( laPhanSo===0){
        if (eq[0] >0){
            cauDung = 2;
        }else{
            cauDung = 3;
        }
    }else{
        if (eq[0]<0){
            cauDung = 1;
        }
    }
    // lấy chỉ số câu đúng sau khi trộn.
    cauDung = map.indexOf(cauDung);
    // hết lấy chỉ số đáp án đúng.

    // gán câu đúng.
    const correctChoice = document.getElementById(`choice${cauDung}`); // chỉ số của lựa chọn đúng tích nghiệm.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');
        }
    });
}
// HẾT HÀM 3.

// 4. TÌM THAM SỐ M ĐỂ PHƯƠNG TRÌNH CÓ 2 NGHIỆM PHÂN BIỆT, VÔ NGHIỆM, NGHIỆM KÉP DẠNG Ax^2 + (Mm+N)x + C = 0.
function timThamSo_phuongTrinh_coNghiem_voNghiem(){
    
}
// HẾT HÀM 4.


// hết các câu hỏi
let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*3)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            taoTracNghiem_BatPhuongTrinhBacHai2Nghiem();
            break;
        case 2:
            taoTracNghiem_TapXacDinhHamSoCoCan2Nghiem();
            break;
        case 3:
            taoTracNghiem_TapXacDinhHamSoCoCan1Nghiem();
            break;
    }
});
