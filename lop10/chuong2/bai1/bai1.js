// Lớp 10. Chương 2. Bài 1: Bất phương trình bậc nhất hai ẩn.

//  1. NHẬN BIẾT BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  2. TÌM NGHIỆM CỦA BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  3. TÌM MIỀN NGHIỆM CỦA BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  4. CHO MIỀN NGHIỆM, TÌM LẠI BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.


// để vẽ hình, tôi chọn vẽ bằng định dạng svg.

// khích thức khung hình:
let rongSVG = caoSVG = 400;

// hàm đổi tọa độ từ Đề-các sang tọa độ trong SVG với gốc nằm chính giữa khung hình. Nhận vào cặp tọa độ kiểu list  cho ra kiểu list luôn.
function doiSVG(toaDo){
    let xSVG = toaDo[0] + rongSVG/2;
    let ySVG = -toaDo[1] + caoSVG/2;
    return [xSVG,ySVG];
}
// hàm ghi tọa độ ra kiểu SVG là `x,y`. Không ngoặc, không có x1, y1, x2, y2.
function ghiToaDo(toaDo){
    return `${toaDo[0]},${toaDo[1]}`;
}

// xác định 2 điểm để vẽ bờ miền nghiệm, tọa độ 2 điểm decaster
function tim2Diem_veBoMienNghiem(a,b,c){// xác định x1, y1, x2, y2 để vẽ bờ. tọa độ decaster.
    if (c===0){// 1.ra ax + by = 0 đi qua gốc tọa độ:
        if (a===0 || b===0){// 1.1 nếu a hay b bằng 0, ra trục tọa độ,
            if (a != 0){
                return [0,-200,0,200,0];// kèm 0 là scale
            } else {
                return [-200,0,200,0,0];// kèm 0 là scale
            }
        } else {// 1.2 ngược lại thì ra đường thẳng không trùng 2 trục, xác định 2 điểm xa nhất:
            if (Math.abs(a/b) >1){
                return [200,-200*a/b,-200, 200*a/b,0];// kèm 0 là scale
            } else {
                return [200*b/a,-200,-200*b/a,200,0];// kèm 0 là scale
            }
        }
    } else {// c khác 0
        if (a===0 || b===0){// 2. nếu là dạng x = c/a hay y = c/b. vẽ đường song song với trục
            let nghiem = soNguyenDuong(50)+70; //chọn đại giá trị c/a hay c/b là số dương đại diện.
            if (-c/(a+b)<0){// nếu < 0 thì đổi dấu.
                nghiem = -nghiem;
            }
            // ghi kết quả ra:
            if (a != 0){// đường x=nghiem
                return [nghiem,-200, nghiem, 200,-a*nghiem];// kèm C lớn scale
            } else {// đường y=nghiem
                return [-200, nghiem, 200, nghiem,-a*nghiem];// kèm C lớn scale
            }
        } else {// 3. cả a, b, c khác 0. vẽ cắt cả 2 trục.
            let M = Math.max(Math.abs(c/b),Math.abs(c/a));// tìm max của 2 điểm cắt.
            let R = Math.random()*20+140;// tạo số ngẫu nhiên trong khoảng [140;160]
            let scale=R/M; // hệ số co dãn hình, để vẽ cho đẹp. Tôi tính vậy!
            // có hệ số co rồi thì nhân c cho hệ số co: ở đây là tìm đường ax + by + c*scale = 0 song song với ax + by + c = 0 mà cắt 2 trục không cắt gốc.
            let C = c*scale; // ------hệ số C lớn này sẽ trả ra để dùng tìm miền gạch chéo.------
        
            // tìm max min hoành độ giao để tìm điểm vẽ.
            let max_x = Math.max((-C-200*b)/a,200,(-C+200*b)/a);
            let min_x = Math.min((-C-200*b)/a,-200,(-C+200*b)/a);
            // tìm tung độ tương ứng
            let y_max_x = (-C-a*max_x)/b;
            let y_min_x = (-C-a*min_x)/b;
    
            return [max_x,y_max_x,min_x,y_min_x,C]; //tọa độ gốc trong trục Oxy kèm C lớn scale từ c nhỏ
            
        }
    }
}
// hết vẽ đường thẳng cho bờ miền nghiệm

// tìm kiểu gạch chéo cho miền nghiệm
function timKieuGachCheo(a,b){// ra kết quả tọa độ trong SVG luôn kiểu x1 = y1 = x2 = y2 = .
    let stringSVG=``;
    
    // A, B là tọa độ pháp tuyến, 
    let A = a;
    let B = b;
    if (A<0){// đổi dấu cho A luôn dương
        A = -A;
        B = -B;
    }

    let M = Math.max(A, Math.abs(B));// tìm max để sau đó làm tọa độ khít với ô 10x10.
    let gachCheo =  [Math.round(A*10/M),Math.round(B*10/M)];// tọa độ vecto cho gạch chéo không quá 10x10.
    
    // bắt đầu xác định 2 mốc tọa độ trên ô 10x10:
    if ( gachCheo[1] > 0 ){// nếu tọa độ dương hết, vẽ từ (0,0) ra
        stringSVG = ` x1="0" y1="0" x2="${gachCheo[0]}" y2="${gachCheo[1]}" `;
    } else {// nếu y < 0 thì tịnh tiến theo trục y lên 10.
        stringSVG = ` x1="0" y1="10" x2="${gachCheo[0]}" y2="${gachCheo[1]+10}" `;
    }

    // trả kết quả
    return stringSVG;
}
// hết tìm kiểu gạch chéo.

// tìm miền cần để gạch chéo.
function timMienGachCheo(a,b,list,dau){// tham số đầu vào có a, b, list các điểm cùng giá trị C lớn đã scale, và dau.
    let cacDiem = [list[0],list[1],list[2],list[3]];// 2 điểm xác định bờ luôn có mặt.
    let C = list[4];// lấy C lớn đã scale.

    // 1. nếu cắt cả Ox Oy tại 2 điểm khác nhau thì lấy 1 đỉnh nữa tạo thành tam giác biễu diễn miền bỏ đi.
    if (a !=0 & b!= 0){
        let moc1 = [list[0],list[3]];// điểm còn lại của hình chữ nhật 1
        let moc2 = [list[2],list[1]];// điểm còn lại của hình chữ nhật 2
        
        // tìm điểm mốc cuối.
        if (dau===`<` || dau===`\\leq`){// nhỏ hơn bằng
            if (a*moc1[0] + b*moc1[1]+C > 0){ // thử mốc 1 vô không thỏa thì lấy luôn
                cacDiem.push(moc1[0],moc1[1]);
            } else {// thỏa thì mốc 2 bỏ vô
                cacDiem.push(moc2[0],moc2[1]);
            }
        } else { // lớn hơn bằng
            if (a*moc1[0] + b*moc1[1]+C < 0){ // thử mốc 1 vô không thỏa thì lấy luôn
                cacDiem.push(moc1[0],moc1[1]);
            } else {// thỏa thì mốc 2 bỏ vô
                cacDiem.push(moc2[0],moc2[1]);
            }
        }
    } else {// 2. ra kiểu x=nghiem hay y=nghiem
        if(a!=0){// x=nghiem, cacDiem sẽ là (nghiem,-200) và (nghiem,200)
            // tìm điểm mốc cuối.
            if (dau===`<` || dau===`\\leq`){// nhỏ hơn bằng
                if (200*a+200*b+C>0){// không thỏa thì để vô
                    cacDiem.push(200,200,200,-200);
                } else {
                    cacDiem.push(-200,200,-200,-200);
                }
            } else {// dấu lớn hơn bằng
                if (200*a+200*b+C < 0){// không thỏa thì để vô
                    cacDiem.push(200,200,200,-200);
                } else {
                    cacDiem.push(-200,200,-200,-200);
                }
            }
        } else {// y=nghiem, cacDiem sẽ là (-200,nghiem) và (200,nghiem)
            if (dau===`<` || dau===`\\leq`){// nhỏ hơn bằng
                if (200*a+200*b+C>0){// không thỏa thì để vô
                    cacDiem.push(200,200,-200,200);
                } else {
                    cacDiem.push(200,-200,-200,-200);
                }
            } else {
                if (200*a+200*b+C < 0){// không thỏa thì để vô
                    cacDiem.push(200,200,-200,200);
                } else {
                    cacDiem.push(200,-200,-200,-200);
                }
            }
        }
    }

    // trả kết quả:
    return cacDiem;// tọa độ các điểm gốc trong trục Oxy
}

// ghi ra miền gạch chéo từ danh sách các điểm mút của miền
function ghiMienGachCheo(cacDiem){
    let diem0 = doiSVG([cacDiem[0],cacDiem[1]]);// lấy ra điểm 1 và đổi sang SVG
    let diem1 = doiSVG([cacDiem[2],cacDiem[3]]);//  lấy ra điểm 2 và đổi sang SVG
    let diem2 = doiSVG([cacDiem[4],cacDiem[5]]);// lấy ra điểm 3 và đổi sang SVG
    let mienGachCheo = `${diem0[0]},${diem0[1]}  ${diem1[0]},${diem1[1]}  ${diem2[0]},${diem2[1]}`;// bỏ vô string SVG
    if (cacDiem.length === 8){
        let diem3 = doiSVG([cacDiem[6],cacDiem[7]]);// lấy ra điểm 4 và đổi sang SVG
        mienGachCheo += ` ${diem3[0]},${diem3[1]}`;// nhớ dấu cách để không bị dính.
    }
    return mienGachCheo;
}


// hàm vẽ miền nghiệm bất phương trình.
let demSoLuongSVG = 0;// do các svg trong cùng 1 html chia sẻ pattern nên thêm số này vô mỗi pattern để khác biệt.
function veMienNghiemBPT(a,b,c,dau){// a, b, c nguyên, dau là "<",">","\\leq","\\geq".
    // xác định bờ của miền nghiệm.
    let diem = tim2Diem_veBoMienNghiem(a,b,c);// tọa độ gốc
    let diemSVG1 = doiSVG([diem[0],diem[1]]);// lấy ra điểm 1 và đổi sang SVG
    let diemSVG2 = doiSVG([diem[2],diem[3]]);// lấy ra điểm 1 và đổi sang SVG
    let duongThang = `x1=${diemSVG1[0]} y1=${diemSVG1[1]} x2=${diemSVG2[0]} y2=${diemSVG2[1]}`;

    // xác định duongGachCheo để gạch bỏ miền không nghiệm
    let duongGachCheo = `${timKieuGachCheo(a,b)}`;

    // xác định mienGachCheo là miền bỏ đi
    let mienGachCheo = ghiMienGachCheo(timMienGachCheo(a,b,diem,dau));// bỏ vô string SVG

    // stringSVG là chuỗi chứa nội dung SVG cần tạo:
    let stringSVG = `<svg width="${rongSVG}" height="${caoSVG}" xmlns="http://www.w3.org/2000/svg" style="border:0.5px fill:white">
    <!-- vẽ bao hình vuông -->
    <polygon points="0,0 400,0 400,400 0,400" stroke-width="0.5" fill="white" />
    <!-- vẽ 2 trục-->
    <line x1="0" y1="200" x2="400" y2="200" stroke="black" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="black" />
    <!-- vẽ mũi tên 2 trục-->
    <polyline points="${ghiToaDo(doiSVG([-5,190]))} ${ghiToaDo(doiSVG([0,200]))} ${ghiToaDo(doiSVG([5,190]))}" stroke="black" fill="none"/>
    <polyline points="${ghiToaDo(doiSVG([190,-5]))} ${ghiToaDo(doiSVG([200,0]))} ${ghiToaDo(doiSVG([190,5]))}" stroke="black" fill="none"/>
    <!-- gọi tên cho 2 trục-->
    <text x="180" y="15" font-size="16" fill="black" stroke="black" stroke-width="0.5"> y </text>
    <text x="385" y="220" font-size="16" fill="black" stroke="black" stroke-width="0.5"> x </text>
    <!-- Vẽ gốc O-->
    <text x="180" y="220" font-size="20" fill="black" stroke="black" stroke-width="0.5"> O </text>
    
    <!-- xác định đường gạch chéo -->
    <defs>
    <pattern id="gachCheo${demSoLuongSVG}" x="0" y="0" height="10" width="10" patternUnits="userSpaceOnUse">
        <!-- vẽ đường gạch chéo vuông góc bờ hoặc gần vuông -->
        <line ${duongGachCheo} stroke="black" stroke-width="0.5"/>
    </pattern>
    </defs>
    <!-- xác định miền cần gạch chéo: miền bỏ đi -->
    <polygon points="${mienGachCheo}" stroke-width="0.5" fill="url(#gachCheo${demSoLuongSVG})" />
    <!-- đường thẳng ax+by+c=0 -->
    <line ${duongThang} stroke="black" stroke-width="2"/>
    </svg>`;
    demSoLuongSVG++;// tăng số lượng svg lên 1.
    return stringSVG;
}

// hàm ghi bất phương trình bậc nhất 2 ẩn
function ghiBPT2anBac1(a,b,c,dau){
    let string=``;
    // ghi ax:
    switch(a){
        case 1:
            string+=`x`;
            break;
        case -1:
            string+=`-x`;
            break;
        case 0:
            break;
        default:
            string+=`${a}x`;
            break;
    }
    // ghi by:
    switch(b){
        case 1:
            if(string === ``){
                string+=`y`;
            } else {
                string+=`+y`;
            }
            break;
        case -1:
            string+=`-y`;
            break;
        case 0:
            break;
        default:
            if(b>0 & string != ``){
                string+=`+${b}y`;
            } else {
                string+=`${b}y`;
            }
            break;
    }
    //ghi c và dấu:
    if (Math.random()<0.5){
        if(c>0){
            string+=`+${c}`;
        }
        if(c<0){
            string+=`${c}`;
        }
        string+=` ${dau}  0`;
    } else {
        string+=` ${dau} `;
        if(c>0){
            string+=`${-c}`;
        } else {
            if(c<0){
                string+=`${-c}`;
            } else {
                string +=`0`;
            }
        }
    }
    return string;
}

// 3. TÌM MIỀN NGHIỆM CỦA BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
function timMienNghiem_BPTBacNhat_2An(){
    // tạo ax + by + c thỏa một số điều kiện nghiệm cho kết quả ra nhỏ.
    let a=soNguyen(10);
    let b=soNguyen(10);
    let c=soNguyen(10);
    while(a*a+b*b===0){
        a=soNguyen(10);
        b=soNguyen(10);
    }
    
    // tìm dấu:
    let dau=[`<`,`>`,`\\leq`,`\\geq`][Math.floor(Math.random()*4)];

    // nội dung câu hỏi:
    content.innerHTML = `Tìm miền nghiệm của bất phương trình sau:`;
    // ghi dữ kiện câu hỏi ra:
    equation.innerHTML = mathString( `${ghiBPT2anBac1(a,b,c,dau)}` );

    // tạo các đáp án:
    // Đáp án 1: đúng
    let dapAn0 = `${veMienNghiemBPT(a,b,c,dau)}`;
    // Đáp án 2: sai điểm cắt
    let dapAn1 = `${veMienNghiemBPT(b,a,c,dau)}`;
    // Đáp án 3: sai trục luôn
    let dapAn2 = `${veMienNghiemBPT(b,a,-c,dau)}`;
    // Đáp án 4: to sai miền
    let doiDau = {'<':'\\geq', '>':'\\leq', '\\leq':'>', '\\geq':'<'};
    let dapAn3 = `${veMienNghiemBPT(a,b,c,doiDau[dau])}`;

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapAn0,dapAn1,dapAn2,dapAn3,1);
}


let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');
let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random())+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            timMienNghiem_BPTBacNhat_2An();
            break;
    }
});