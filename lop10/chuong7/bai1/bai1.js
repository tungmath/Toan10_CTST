// Lớp 10. Chương 7. Bài 1. Dấu của tam thức bậc hai.

// 1.   HỎI DẤU TAM THỨC BẬC HAI ĐẠT ĐƯỢC TRÊN KHOẢNG NÀO (CÓ 2 NGHIỆM)
// 2.   HỎI BẢNG XÉT DẤU TAM THỨC BẬC HAI. (CÓ 2 NGHIỆM)

function taoTamThucBacHai(yeuCau){ // tạo tam thức bậc hai với tham số là số nghiệm yêu cầu.
    let x1=new Fraction(1,1), x2 = new Fraction(1,1);
    let soNghiem=-1;
    let a=1, b=1, c=1;
    while (soNghiem!=yeuCau){
        a=(Math.round(Math.random()*10)+1)*randomSign();
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

// 1.  HỎI DẤU TAM THỨC BẬC HAI ĐẠT ĐƯỢC TRÊN KHOẢNG NÀO. (CÓ 2 NGHIỆM)

function taoTracNghiem_HoiDauTamThuc2Nghiem(){
    let eq=taoTamThucBacHai(2);
    let dau = "";
    switch (Math.floor(Math.random()*4)) {
        case 0:
            dau = "âm";
            break;
        case 1:
            dau = "dương";
            break;
        case 2:
            dau = "không âm";
            break;
        case 3:
            dau = "không dương";
            break;
    }

    content.innerHTML = `Tam thức bậc hai dưới đây nhận các giá trị <b> ${dau} </b> khi và chỉ khi ${katex.renderToString(`x`)} thuộc tập nào dưới đây?`;
    equation.innerHTML = katex.renderToString(`f(x)=${trinomial(eq[0],eq[1],eq[2])}`);

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
        case 'âm':
            kieuXetDau=1;
            break;
        case 'dương':
            kieuXetDau=0;
        case 'không âm':
            kieuXetDau=3;
            break;
        case 'không dương':
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

// 2. HỎI BẢNG XÉT DẤU TAM THỨC BẬC HAI. (CÓ 2 NGHIỆM)
function taoTracNghiem_BangXetDauTamThuc2Nghiem(){
    // hàm ghi bảng xét dấu.
    function bangXetDau(x1,x2,dauHeSoA){
        string='';
        string += `\\begin{array}{|l|rrrrrrr|}`;
        string += `\\hline x & -\\infty && ${x1} && ${x2}&&+\\infty \\\\\\hline `;
        if (dauHeSoA >0) {
            string += `f(x) && + & 0 & - & 0 & + & \\\\\\hline`;
        }else{
            string += `f(x) && - & 0 & + & 0 & - & \\\\\\hline`;
        }
        string += `\\end{array}`;
        return string;
    }

    let eq=taoTamThucBacHai(2);
    let dau = "";
    switch (Math.floor(Math.random()*4)) {
        case 0:
            dau = "âm";
            break;
        case 1:
            dau = "dương";
            break;
        case 2:
            dau = "không âm";
            break;
        case 3:
            dau = "không dương";
            break;
    }

    content.innerHTML = `Tìm bảng xét dấu cho tam thức bậc hai dưới đây?`;
    equation.innerHTML = katex.renderToString(`f(x)=${trinomial(eq[0],eq[1],eq[2])}`);

    //tạo các đáp án.
    let choices = [];

    choices.push(katex.renderToString( `${bangXetDau(ghiPhanSo(eq[3]),ghiPhanSo(eq[4]),eq[0])}` ));  // bảng đúng
    choices.push(katex.renderToString( `${bangXetDau(ghiPhanSo(eq[3]),ghiPhanSo(eq[4]),-eq[0])}` ));  // bảng sai dấu
    choices.push(katex.renderToString( `${bangXetDau(ghiPhanSo(eq[4]),ghiPhanSo(eq[3]),-eq[0])}` ));  // bảng sai nghiệm
    choices.push(katex.renderToString( `${bangXetDau(ghiPhanSo( new Fraction(-eq[4].numer,eq[4].denom) ),ghiPhanSo( new Fraction(-eq[3].numer,eq[3].denom) ),-eq[0])}` )); // bảng sai nghiệm
    // hết tạo đáp án.

    // trộn
    map = tronThuTu([0,1,2,3]);
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

    // gán câu đúng.
    let cauDung = map.indexOf(0);// chỉ số đáp án đúng

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}
// HẾT HÀM 2.

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*2)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            taoTracNghiem_HoiDauTamThuc2Nghiem();
            break;
        case 2:
            taoTracNghiem_BangXetDauTamThuc2Nghiem();
            break;
    }
});
