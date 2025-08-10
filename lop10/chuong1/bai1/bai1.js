// Lớp 10. Chương 1. Bài 1. Mệnh đề.

// 1. XÁC ĐỊNH MỆNH ĐỀ.
// 2. XÁC ĐỊNH MỆNH ĐỀ ĐÚNG, MỆNH ĐỀ SAI.
// 3. XÁC ĐỊNH MỆNH ĐỀ CHỨA BIẾN.
// 4. XÁC ĐỊNH MỆNH ĐỀ ĐẢO CỦA MỆNH ĐỀ KÉO THEO.
// 5. XÁC ĐỊNH ĐIỀU KIỆN CẦN, ĐIỀU KIỆN ĐỦ CỦA MỆNH ĐỀ KÉO THEO.
// 6. TÍNH ĐÚNG SAI CỦA MỆNH ĐỀ VỚI MỌI, TỒN TẠI.

let soLuongDung = menhDeDung.length;
let soLuongSai = menhDeSai.length;
let soLuongCauNoi = cauNoi.length;
let soLuongmenhDeChuaBien = menhDeChuaBien.length;

// 1. XÁC ĐỊNH MỆNH ĐỀ.
function xacDinh_MenhDe(){
    // chỉ dấu là, không là:
    let la = [``, `không`][Math.round(Math.random())];

    // nội dung câu hỏi:
    content.innerHTML = `Phát biểu nào sau đây <b>${la}</b> là mệnh đề:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = ``;

    // tạo các đáp án.
    // mặc định HỎI mệnh đề: (đúng hoặc sai)
    let dapan1 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
    if ( Math.random() < 0.33333){
        dapan1 = menhDeSai[Math.floor(Math.random()*soLuongSai)];
    }
    // 3 đáp án còn lại không phải mệnh đề.
    let dapan2 = cauNoi[Math.floor(Math.random()*soLuongCauNoi)];
    let dapan3 = menhDeChuaBien[Math.floor(Math.random()*soLuongmenhDeChuaBien)];
    let dapan4 = cauNoi[Math.floor(Math.random()*soLuongCauNoi)];
    // ngược lại, HỎi KHÔNG là mệnh đề:
    if (la === `không`){
        dapan1 = cauNoi[Math.floor(Math.random()*soLuongCauNoi)];
        if ( Math.random() < 0.33333){
        dapan1 = menhDeChuaBien[Math.floor(Math.random()*soLuongmenhDeChuaBien)];
    }
    // 3 đáp án còn lại là mệnh đề (đúng hoặc sai):
        dapan2 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
        dapan3 = menhDeSai[Math.floor(Math.random()*soLuongDung)];
        dapan4 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
    }
    
    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan1,dapan2,dapan3,dapan4,1);
}

// 2. XÁC ĐỊNH MỆNH ĐỀ ĐÚNG HOẶC SAI.
function xacDinh_DungSai(){
    // chỉ dấu đúng sai:
    let dungSai = [`đúng` , `sai`][Math.round(Math.random())];
    // nội dung câu hỏi:
    content.innerHTML = `Tìm mệnh đề <b> ${dungSai} </b> trong các mệnh đề sau:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = ``;

    // tạo các đáp án.
    // mặc định hỏi mệnh đề đúng
    let dapan1 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
    let dapan2 = menhDeSai[Math.floor(Math.random()*soLuongSai)];
    let dapan3 = menhDeSai[Math.floor(Math.random()*soLuongSai)];
    let dapan4 = menhDeSai[Math.floor(Math.random()*soLuongSai)];
    if (dungSai === `sai`){// nếu chỉ sai thì hỏi mệnh đề sai
        dapan1 = menhDeSai[Math.floor(Math.random()*soLuongSai)];
        dapan2 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
        dapan3 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
        dapan4 = menhDeDung[Math.floor(Math.random()*soLuongDung)];
    }
    
    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan1,dapan2,dapan3,dapan4,1);
}
// HẾT HÀM 2

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*2)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            xacDinh_MenhDe();
            break;
        case 2:
            xacDinh_DungSai();
            break;
    }
});