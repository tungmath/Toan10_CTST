// CÁC HÀM DÙNG CHUNG TRÊN TOÀN TRANG.

// hàm thay katex.renderToString bởi ngắn hơn
function mathString(string){
     return katex.renderToString(string);
}

// hàm trộn danh sách ngẫu nhiên
function tronThuTu(danhSach){// danh sách có thứ tự. các phần tử đều khác nhau. kết quả là danh sách đã trộn.
    let doDai = danhSach.length;
    let danhSachTam = danhSach;
    let danhSachMoi = [];// đặt lại danh sách.
    for (let i=0; i<doDai; i++){
        let chon = Math.floor( Math.random()*(doDai-i) );
        danhSachMoi.push( danhSachTam[chon] );
        danhSachTam.splice(chon,1);
    }
    return danhSachMoi;
}

// hàm tạo ký hiệu dấu.
function kyHieuDau(){
    let dau = ``;
    if(Math.random()>0.5){
        dau = `-`;
    }
    return dau;
}

// hàm tạo số nguyên
function soNguyen(max){// giá trị nguyên trong khoảng -max tới max
    let so = Math.floor(Math.random()*(max+1));
    if (Math.random()>0.5){
        so = -so;
    }
    return so;
}

// hàm tạo số nguyên khác 0:
function soNguyenKhac0(max){// giá trị nguyên trong khoảng -max tới max
    let so = Math.floor(Math.random()*max)+1;
    // dấu ngẫu nhiên
    if (Math.random()>0.5){
        so = -so;
    }
    return so;
}

// hàm tạo số nguyên dương.
function soNguyenDuong(max){
    return Math.floor(Math.random()*max) + 1;
}

// tìm ước chung lớn nhất, greated common divisor, không phân biệt âm dương.
function gcd(a,b) {// tìm ước chung lớn nhất, nếu có đúng 1 số khác 0 thì ước là số lớn hơn. cả hai là 0 thì ước là 1.
    let num=1;
    if (a!=0 && b!=0) {
        let num1=Math.abs(a);
        let num2=Math.abs(b);
        if (num1<num2){
            num =gcd(num2,num1);
        }else{
            if (num1%num2===0) {
                num=num2;
            }else{
                num=gcd(num2,num1%num2);
            }
        }
    }else{
        if (a+b!=0){
            num = Math.abs(a)+Math.abs(b);
        }
    }
    return num;
}

// tìm ước của a mà bình phương lên vẫn là ước của a, dùng trong rút gọn căn bậc 2 của số nguyên.
function uocChinhPhuong(a){// tìm ước chính phương lớn nhất.
    let uocChinhPhuong = Math.floor(Math.sqrt(a));
    while (a%(uocChinhPhuong*uocChinhPhuong)!=0 & uocChinhPhuong>1){
        uocChinhPhuong -=1;
    }
    return uocChinhPhuong;
}


// lớp phân số.
class Fraction {
    constructor(n,d){
        let uoc=gcd(n,d);
        n=n/uoc;
        d=d/uoc;
        this.tuso=n;
        this.mauso=d;
        if (this.mauso<0){
            this.mauso = -this.mauso;
            this.tuso = -this.tuso;
        }
    }

}

// so sánh 2 phân số
function soSanhPhanSo(a,b){
    let hieu = a.tuso*b.mauso - a.mauso*b.tuso;
    if (hieu > 0){
        return `>`;
    } else {
        if (hieu < 0){
            return `<`;
        } else {
            return `=`;
        }
    }
}

// cộng 2 phân số
function congPhanSo(a,b){
    return new Fraction(a.tuso*b.mauso + a.mauso*b.tuso , a.mauso*b.mauso);
}

// trừ 2 phân số
function truPhanSo(a,b){
    return new Fraction(a.tuso*b.mauso - a.mauso*b.tuso , a.mauso*b.mauso);
}

// nhân 2 phân số
function nhanPhanSo(a,b){
    return new Fraction(a.tuso*b.tuso , a.mauso*b.mauso);
}

// chia 2 phân số
function chiaPhanSo(a,b){
    if (b.tuso !=0){
        return new Fraction(a.tuso*b.mauso , a.mauso*b.tuso);
    }else{
        return `Không thể chia cho 0!`;
    }
}

// ghi phân số ra dạng chuỗi latex
function ghiPhanSo(phanSo){// hàm ghi phân số
    if (phanSo.mauso===1){
        string=`${phanSo.tuso}`;
    }else{
        if (phanSo.tuso<0){// khi tử âm và mẫu khác 1, đổi dấu trừ ra ngoài
            string =`-\\dfrac{${-phanSo.tuso}}{${phanSo.mauso}}`;
        }else{
            string =`\\dfrac{${phanSo.tuso}}{${phanSo.mauso}}`;
        }
    };
    return string;
}

function randomSign(){// giờ không hiểu để sài trong bài nào???
    let sign = 1;
    if (Math.round(Math.random())===0) {
        sign=-1;
    };
    return sign;
}

// ghi tam thức ax^2 + bx + c
function trinomial(a,b,c) { // a, b, c với a khác 0.
    let string=``;
    if (a===1){
        string+=`x^2`;
    }else{
        if (a==-1) {
            string+='-x^2';
        }else{
            if (a!=0){
                string+=`${a}x^2`;
            }
        }
    }
    if (b===-1){
        string+=`-x`;
    }else{
        if (b===1){
            string+=`+x`;
        }else{
            if (b>1){
                string+=`+${b}x`;
            }else{
                if (b<-1) {
                    string+=`${b}x`;
                }
            }
        }
    }
    if (c>0){
        string+=`+${c}`;
    }else{
        if (c<0){
            string+=`${c}`;
        }
    }
    return string;
}

// ghi nhị thức ax + b
function binomial(a,b){
    let string=``;
    if (a===1){
        string+=`x`;
    }else{
        if (a===-1){
            string+=`-x`;
        }else{
            if (a!=0){
                string+=`${a}x`;
            }
        }
    }
    if (b>0){
        string+=`+${b}`;
    }else{
        if (b<0){
            string+=`${b}`;
        }
    }
//trường hợp đặc biệt ghi dạng b+ax:
    if(a<0 && b>0){
        string=``;
        string+=`${b}`;
        if (a===1){
            string+=`+x`;
        }else{
            if (a===-1){
                string+=`-x`;
            }else{
                if (a<1){
                    string+=`${a}x`;
                }else{
                    if (a>1){
                        string += `+${a}`;
                    }
                }
            }
        }
    }
    
// hết trường hợp đặc biệt
    return string;
}

// ghi căn bậc 2 của một số nguyên
function ghiCanBacHai(a){
    let string =`0`;

    // tìm ước là số chính phương
    let uocCanNguyen = uocChinhPhuong(a);
    // tìm được căn của ước chính phương thì ghi ra dạng căn bậc hai.
    if (a===1){
        string =`1`;
    }else{
        if (a>1){
            if ((a/uocCanNguyen)/uocCanNguyen===1){ // a chính phương
                string = `${uocCanNguyen}`;
            }else{ // a không chính phương
                if (uocCanNguyen===1){ // và không có ước chính phương
                    string = `\\sqrt{${a}}`;
                }else{ // nhưng có ước chính phương
                    string = `${uocCanNguyen}\\sqrt{${(a/uocCanNguyen)/uocCanNguyen}}`;
                }
            }
        }
    }
    return string;
}

// hiện trắc nghiệm 4 lựa chọn, các hiệu ứng khi chọn bỏ chọn, câu đúng câu sai.
function hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,viTriDung){
    // trộn
    map = tronThuTu([0,1,2,3]);
    let newChoices = [dapan0,dapan1,dapan2,dapan3];
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.

    // hiện đáp án ra.
    choicesElement.innerHTML = '';
    let i=0;

    for (const choice of choices){ // thêm id cho các nút choice là choice1, choice2, choice3, choice4
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }
    // hết hiện đáp án.

    // người dùng chọn đáp án nào thì đáp án đó xanh lá, các đáp án khác về bình thường.
    let userChoice=[];
    let userChoiceIndex=0; // biến lưu thứ tự câu người dùng chọn.
    for (let a=0 ; a<4 ; a++){
        userChoice.push(document.getElementById(`choice${a}`));
        userChoice[a].addEventListener('click', () => {
            userChoice[a].classList.add('userchoice');
            userChoiceIndex=a+1; //lấy thứ tự câu người dùng chọn.
            for (let i=0 ; i<4 ; i++){
                if (i!=a){
                    userChoice[i].classList.remove('userchoice');
                }
            }
        });
    }

    // lấy chỉ số câu đúng sau khi trộn.
    cauDung = map.indexOf(viTriDung-1); // câu đúng - 1. vì list đánh số từ 0 còn thông thường ta dếm từ 1.
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