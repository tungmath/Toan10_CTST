// Lớp 10, chương 9, bài 2. Đường thẳng trong mặt phẳng tọa độ.

// 1.   TỔNG QUÁT BIẾT ĐIỂM ĐI QUA VÀ VECTOR PHÁP TUYẾN.
// 2.   TỔNG QUÁT BIẾT ĐIỂM ĐI QUA VÀ VECTOR CHỈ PHƯƠNG.
// 3.   THAM SỐ BIẾT ĐIỂM ĐI QUA VÀ VECTOR CHỈ PHƯƠNG.
// 4.   THAM SÔ BIÊT DIỂM ĐI QUA VÀ VECTOR PHAP TUYẾN.
// 5.   CHO VTCP HỎI VTPT, ngược lại.
// 6.   CHO PHƯƠNG TRÌNH THANM SỐ (TỔNG QUÁT) HỎI VTPT (VTCP).
// 7.   VIẾT PT THAM SỐ (TỔNG QUÁT) ĐI QUA 2 ĐIỂM.
// 8.   GÓC GIỮA 2 ĐƯỜNG THẲNG.
// 9.   KHOẢNG CÁCH ĐIỂM TỚI ĐƯỜNG.
// 10.  HỆ SỐ GÓC.
// 11.  TRUNG TUYẾN TAM GIÁC BIẾT 3 ĐỈNH.
// 12.  ĐƯỜNG CAO TAM GIÁC BIẾT 3 ĐỈNH.
// 13.  TÌM SỐ GIAO ĐIỂM 2 ĐƯỜNG THẲNG.
// 14.  TÌM TỌA ĐỘ GIAO ĐIỂM 2 ĐƯỜNG THẲNG.
// 15.  PHƯƠNG TRÌNH ĐƯỜNG TRUNG TRỰC CỦA ĐOẠN THẲNG.
// 16.  TÌM CHÂN ĐƯỜNG CAO CỦA TAM GIÁC.
// 17.  TÌM HÌNH CHIẾU VUÔNG GÓC TỪ ĐIỂM XUỐNG ĐƯỜNG.
// ????.  CHO ĐƯỜNG CÓ VTPT (VTCP) VIẾT PT THAM SỐ (TỔNG QUÁT) CỦA ĐƯỜNG SONG SONG (VUÔNG GÓC) VỚI NÓ QUA  ĐIỂM CHO TRƯỚC.
// ???
// ???
// ???.



// Hàm viết phương trình tổng quát dạng ax + by + c = 0 khi biết a, b, c là các số nguyên:
function phuongTrinhTongQuat(a,b,c){
        // đổi dấu cho gọn
        if ((a<0 & b<0) || (a===0 & b<0)){
            a = -a; b = -b; c = -c;
        }
        // rút gọn
        let ucln = gcd(a,gcd(b,c));
        a = a/ucln;
        b = b/ucln;
        c = c/ucln;
        // hết rút gọn

        let string=``;
        // viết ax
        switch(a){
            case 1:
                string = `x`;
                break;
            case -1:
                string = `-x`;
                break;
            case 0:
                break;
            default:
                string = `${a}x`;
        }
        // viết by. Dấu + có hay không tùy vào ax có hay không.
        switch(b){
            case 1:
                {if (string===``){
                    string += `y`;
                } else {
                    string += `+y`;
                }}
                break;
            case -1:
                string += `-y`;
                break;
            case 0:
                break;
            default:
                {if (b>0){
                    if (string === ``){
                        string += `${b}y`;
                    } else {
                        string += `+${b}y`;
                    }
                } else {
                    string += `${b}y`;
                }}
        }
        // viết c = 0. lưu ý là chuỗi trước c phải khác trống do a và b không cùng bằng 0 nên không cần kiểm tra chuỗi trống như by.
        if (c===0){
            string += `=0`;
        } else {
            if (c>0) {
                string += `+${c}=0`;
            } else {
                string += `${c}=0`;
            }
        }
        return string;
    }
// HẾT HÀM viêt phương trình ax + by +  c = 0 khi biết a, b, c

// hàm viết phương trình tham số x = at+x0 & y = by + y0, biết (a, b) và (x0, y0):
function phuongTrinhThamSo(a,b,x0,y0) {
        let string = `\\begin{cases}`;
        // ghi x=
        string += `x=`;
        // ghi a:
        switch (a){
            case 1:
                string += `t`;
                break;
            case -1:
                string += `-t`; break;
            default:
                if (a!=0) {
                    string += `${a}t`;
                }
        }
        // ghi x0:
        if (a!=0){
            if(x0<0){
                string += `${x0}`;
            }
            if(x0>0){
                string += `+${x0}`;
            }
        } else { 
            string += `${x0}`;
        }
        // xuống dòng
        string +=` \\\\ `;
        // ghi y=
        string += `y=`;
        // ghi b:
        switch (b){
            case 1:
                string += `t`;
                break;
            case -1:
                string += `-t`; break;
            default:
                if (b!=0) {
                    string += `${b}t`;
                }
        }
        // ghi y0:
        if (b!=0){
            if(y0<0){
                string += `${y0}`;
            }
            if(y0>0){
                string += `+${y0}`;
            }
        } else { 
            string += `${y0}`;
        }
        // ghi kết thúc:
        string += `\\end{cases}`;
        return string;
    }
// HẾT HÀM phương trình tham số.

// lấy tên diểm ngẫu nhiên
function tenDiem() {
    let tenDiem = [`A`,`B`,`C`,`D`,`F`,`E`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`,`S`];
    // Chọn tên điểm ngẫu nhiên
    let diem = tenDiem[Math.floor(Math.random()*tenDiem.length)];
    return diem;
}

// lấy tên vec tơ ngẫu nhiên
function tenVector() {
    let tenVecto = [`a`,`b`,`c`,`e`,`g`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`z`];
    // Tên vector ngẫu nhiên
    let vector = tenVecto[Math.floor(Math.random()*tenVecto.length)];
    return vector;
}

// 1. HỎI PHƯƠNG TRÌNH TỔNG QUÁT BIẾT ĐIỂM ĐI QUA VÀ VECTOR PHÁP TUYẾN
function hoiPhuongTrinhTongQuat_diemDiQua_phapTuyen(){

    // Tên điểm ngẫu nhiên
    let diem = tenDiem();
    // Tên vector ngẫu nhiên
    let vector = tenVector();

    // Tạo tọa độ ngẫu nhiên cho điểm 
    let x0 = soNguyen(10);
    let y0 = soNguyen(10);

    // Tạo tọa độ ngẫu nhiên cho và vector
    let a = soNguyen(15);
    let b = soNguyen(15);

    // nội dung câu hỏi:
    content.innerHTML = `Đường thẳng qua điểm ${diem} và có véc tơ <b>pháp tuyến</b> ${katex.renderToString(`\\vec{${vector}}`)} có phương trình <b>tổng quát</b> nào sau đây? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${diem}=(${x0},${y0});\\: \\vec{${vector}}=(${a},${b})` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let c = -a*x0-b*y0;
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,c)}`)}`;

    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(x0,y0,c)}`)}`;
    // 2.1 thay kiểu sai khác:
    if (Math.random() <0.8) {
            dapan1 = `${katex.renderToString(`${phuongTrinhThamSo(b,-a,x0,y0)}`)}`;
    }
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,-c)}`)}`;
    // 3.1 thay kiểu sai khác:
    if (a!=b) { dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(b,-a,c)}`)}`; }
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(x0,y0,-c)}`)}`; //
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 1.

// 2. HỎI PHƯƠNG TRÌNH TỔNG QUÁT BIẾT ĐIỂM ĐI QUA VÀ VECTOR CHỈ PHƯƠNG
function hoiPhuongTrinhTongQuat_diemDiQua_chiPhuong(){

    // Tên điểm ngẫu nhiên
    let diem = tenDiem();
    // Tên vector ngẫu nhiên
    let vector = tenVector();

    // Tạo tọa độ ngẫu nhiên cho điểm 
    let x0 = soNguyen(10);
    let y0 = soNguyen(10);

    // Tạo tọa độ ngẫu nhiên cho và vector
    let a = soNguyen(15);
    let b = soNguyen(15);

    // nội dung câu hỏi:
    content.innerHTML = `Đường thẳng qua điểm ${diem} và có véc tơ <b>chỉ phương</b> ${katex.renderToString(`\\vec{${vector}}`)} có phương trình <b>tổng quát</b> nào sau đây? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${diem}=(${x0},${y0});\\: \\vec{${vector}}=(${a},${b})` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let c = -b*x0+a*y0; // chỉ phương (a,b)--> pháp tuyên (b,-a)--> b(x-x0) -a(y-y0)=0
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(b,-a,c)}`)}`;

    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(x0,y0,-a*x0-b*y0)}`)}`;
    // 2.1 thay kiểu sai khác:
    let kieusai = Math.random();
    if (kieusai <0.8 & a!=b) {
        dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(b,a,-a*x0-b*y0)}`)}`;
    }
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,-a*x0-b*y0)}`)}`;
    // 3.1 thay kiểu sai khác:
    if (a!=b) { dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(b,a,c)}`)}`; }
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`${phuongTrinhThamSo(a,b,x0,y0)}`)}`; //
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 2.

// 3. THAM SỐ BIẾT ĐIỂM ĐI QUA VÀ VECTOR CHỈ PHƯƠNG
function hoiPhuongTrinhThamSo_diemDiQua_chiPhuong(){

    // Tên điểm ngẫu nhiên
    let diem = tenDiem();
    // Tên vector ngẫu nhiên
    let vector = tenVector();

    // Tạo tọa độ ngẫu nhiên cho điểm 
    let x0 = soNguyen(10);
    let y0 = soNguyen(10);

    // Tạo tọa độ ngẫu nhiên cho và vector
    let a = soNguyen(15);
    let b = soNguyen(15);
    // nội dung câu hỏi:
    content.innerHTML = `Đường thẳng qua điểm ${diem} và có véc tơ <b>chỉ phương</b> ${katex.renderToString(`\\vec{${vector}}`)} có phương trình <b>tham số</b> nào sau đây? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${diem}=(${x0},${y0});\\: \\vec{${vector}}=(${a},${b})` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhThamSo(a,b,x0,y0)}`)}`;
    // chỉnh lại vec tor chỉ phương về tối giản.
    if (Math.random()<0.51){
        a=a/gcd(a,b); b=b/gcd(a,b);
        dapan0 = `${katex.renderToString(`${phuongTrinhThamSo(a,b,x0,y0)}`)}`;
    }    

    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`${phuongTrinhThamSo(x0,y0, a, b)}`)}`;
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,-a*x0-b*y0)}`)}`;
    // 3.1 thay kiểu sai khác:
    if (Math.random()<0.7) { dapan2 = `${katex.renderToString(`${phuongTrinhThamSo(b,-a,x0,y0)}`)}`; }
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(x0,y0,a*x0+b*y0)}`)}`;
    // 2.1 thay kiểu sai khác:
    if (Math.random() <0.8 & a!=b) {
        dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(b,a,-a*x0-b*y0)}`)}`;
    } //
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 3.

// 4. THAM SÔ BIÊT DIỂM ĐI QUA VÀ VECTOR PHÁP TUYẾN
function hoiPhuongTrinhThamSo_diemDiQua_phapTuyen(){

    // Tên điểm ngẫu nhiên
    let diem = tenDiem();
    // Tên vector ngẫu nhiên
    let vector = tenVector();

    // Tạo tọa độ ngẫu nhiên cho điểm 
    let x0 = soNguyen(10);
    let y0 = soNguyen(10);

    // Tạo tọa độ ngẫu nhiên vector
    let a = soNguyen(15);
    let b = soNguyen(15);

    // nội dung câu hỏi:
    content.innerHTML = `Đường thẳng qua điểm ${diem} và có véc tơ <b>pháp tuyến</b> ${katex.renderToString(`\\vec{${vector}}`)} có phương trình <b>tham số</b> nào sau đây? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${diem}=(${x0},${y0});\\: \\vec{${vector}}=(${a},${b})` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhThamSo(b,-a,x0,y0)}`)}`;
    // chỉnh lại vec tor chỉ phương về tối giản.
    if (Math.random()<0.3333333){
        a=a/gcd(a,b); b=b/gcd(a,b);
        dapan0 = `${katex.renderToString(`${phuongTrinhThamSo(b,-a,x0,y0)}`)}`;
    }    
    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`${phuongTrinhThamSo(x0,y0, a, b)}`)}`;
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhThamSo(b,a,x0,y0)}`)}`;
    // 3.1 thay kiểu sai khác:
    if (Math.random()<0.7) { dapan2 = `${katex.renderToString(`${phuongTrinhThamSo(a,b,x0,y0)}`)}`; }
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(x0,y0,-a*x0-b*y0)}`)}`;
    // 2.1 thay kiểu sai khác:
    if (Math.random() <0.8 & a!=b) {
        dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(b,a,-a*x0-b*y0)}`)}`;
    } //
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 4.

// 5. CHO VTCP HỎI VTPT.
function choCP_timPT_nguocLai() {

    // Tên vector ngẫu nhiên
    let vector = tenVector();
    // Tạo tọa độ ngẫu nhiên cho vector
    let a = soNguyen(15);
    let b = soNguyen(15);

    let vec1 = `VTPT`;
    let vec2 = `VTCP`;
    if (Math.random() > 0.5){
        vec1 = `VTCP`; vec2 = `VTPT`;
    }

    // nội dung câu hỏi:
    content.innerHTML = `Cặp số nào sau đây là tọa độ ${vec1} của đường thẳng có ${vec2} là ${katex.renderToString(`\\vec{${vector}}`)}. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`\\vec{${vector}}=(${a};${b})`)}`;

    // tạo các lựa chọn.
    // 1. đáp án đúng
    let dapan0 = `${katex.renderToString(`(${b};${-a})`)}`;
    
    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`(${b};${a})`)}`;
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`(${-b};${-a})`)}`;
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`(${a};${-b})`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 5.

// 6. CHO PHƯƠNG TRÌNH THANM SỐ (TỔNG QUÁT) HỎI VTPT (VTCP).
function choPhuongTrinh_hoiVecto(){

    // Tên vector ngẫu nhiên
    let vector = tenVector();
    // Tạo tọa độ ngẫu nhiên cho vector (a; b)
    let a = soNguyen(15);
    let b = soNguyen(15);

    // Tạo tọa độ ngẫu nhiên cho điểm (x0; y0)
    let x0 = soNguyen(20);
    let y0 = soNguyen(20);
    // loại tham số hay tổng quát.
    let loaiPT = 0; // tổng quát
    if (Math.random()>0.5) {
        loaiPT = 1; // tham số
    }

    // xác định kiểu vec tơ cần hỏi.
    let vecto = `pháp tuyến`; 
    if (Math.random()>0.5){
        vecto = `chỉ phương`;
    }
    // nội dung câu hỏi:
    content.innerHTML = `Tìm vec tơ <b>${vecto}</b> của đường thẳng có phương trình dưới đây:`;
    // xác định loại phương trình:
    let phuongTrinh = phuongTrinhTongQuat(a,b,Math.floor(Math.random()*30));// mặc định tổng quát, hỏi pháp tuyến
    if (vecto===`chỉ phương`){
        phuongTrinh = phuongTrinhTongQuat(b,-a,Math.floor(Math.random()*30));// nếu để tổng quát, hỏi chỉ phương thì đảo đổi dấu.
    }
    if (loaiPT!=0){// nếu là tham số
        phuongTrinh = phuongTrinhThamSo(a,b,x0,y0);// mặc định hỏi chỉ phương.
        if(vecto===`pháp tuyến`){
            phuongTrinh = phuongTrinhThamSo(b,-a,x0,y0);// nếu là tham số, hỏi pháp tuyến thì đảo đổi dấu.
        }
    }
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`${phuongTrinh}`)}`;

    // 1. đáp án đúng
    let dapan0 = `${katex.renderToString(`\\vec{${vector}}=(${a};${b})`)}`;
    
    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`\\vec{${vector}}=(${b};${a})`)}`;
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`\\vec{${vector}}=(${-b};${-a})`)}`;
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`\\vec{${vector}}=(${a};${-b})`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 6.

// 7. VIẾT PT THAM SỐ (TỔNG QUÁT) ĐI QUA 2 ĐIỂM.
function phuongTrinh_DuongQua2Diem(){
    // tạo ra tọa độ cho 2 điểm:
    let A= [soNguyen(20), soNguyen(20)];
    let B= [soNguyen(20), soNguyen(20)];
    // lấy tên điểm ngẫu nhiên:
    let tenDiemA = tenDiem();
    let tenDiemB = tenDiem();
    while (tenDiemA===tenDiemB){
        tenDiemB = tenDiem();
    }
    // tính vecto chỉ phương:
    let chiPhuong= [A[0]-B[0],A[1]-B[1]];
    let phapTuyen = [chiPhuong[1],-chiPhuong[0]];
    // biến chỉ định loại phương trình:
    let loaiPT = `tham số`;
    if (Math.random()>0.5){
        loaiPT = `tổng quát`;
    }

     // nội dung câu hỏi:
    content.innerHTML = `Viết phương trình <b>${loaiPT}</b> của đường thẳng đi qua 2 điểm ${tenDiemA} và ${tenDiemB}. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`${tenDiemA}( ${A[0]}; ${A[1]} ) ;\\: ${tenDiemB} ( ${B[0]} ; ${B[1]} )`)}`;

    // 1. đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhThamSo(chiPhuong[0],chiPhuong[1],A[0],A[1])}`)}`;
    if (loaiPT!=`tham số`){
        let c=-phapTuyen[0]*A[0]-phapTuyen[1]*A[1];
        dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(phapTuyen[0],phapTuyen[1],c)}`)}`;
    }
    
    // 2. đáp án sai 1: Ngược lại với cái đúng trên:
    let c=-phapTuyen[0]*A[0]-phapTuyen[1]*A[1];
    let dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(phapTuyen[0],phapTuyen[1],c)}`)}`;
    if (loaiPT!=`tham số`){
        dapan1 = `${katex.renderToString(`${phuongTrinhThamSo(chiPhuong[0],chiPhuong[1],A[0],A[1])}`)}`;        
    }

    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(phapTuyen[0],phapTuyen[1],-c)}`)}`;
    
    // 4. đáp án sai 3:
    let dapan3 = `${katex.renderToString(`${phuongTrinhThamSo(phapTuyen[0],phapTuyen[1],A[0],A[1])}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 7.

//8.   GÓC GIỮA 2 ĐƯỜNG THẲNG.
function goc_2DuongThang(){
    // Phương trình đường 1.
    let a0 = soNguyen(20);
    let b0 = soNguyen(20);
    while (a0 ===0 & b0===0){
        a0 = soNguyen(20);
        b0 = soNguyen(20);
    }
    let c0 = soNguyen(30);

    // Phương trình đường 2.
    let a1 = soNguyen(20);
    let b1 = soNguyen(20);
    while (a1 ===0 & b1===0){
        a1 = soNguyen(20);
        b1 = soNguyen(20);
    }
    let c1 = soNguyen(30);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm góc giữa 2 đường thẳng ${katex.renderToString(`d`)} và ${katex.renderToString(`\\Delta`)}. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`d:${phuongTrinhTongQuat(a0,b0,c0)}; \\: \\Delta: ${phuongTrinhTongQuat(a1,b1,c1)}`)}`;

    // 1. đáp án đúng
    let goc = Math.floor((Math.acos(Math.abs(a0*a1+b0*b1)/(Math.sqrt(a0*a0+b0*b0)*Math.sqrt(a1*a1+b1*b1)))/Math.PI)*180) ;
    let dapan0 = `${katex.renderToString(`\\approx ${goc}^o`)}`;
       
    // 2. đáp án sai 1: góc bù. (sẽ >=90)
    let dapan1 = `${katex.renderToString(`\\approx ${180 - goc}^o`)}`;
    
    // 3. đáp án sai 2: góc âm.
    let dapan2 = `${katex.renderToString(`\\approx -${goc}^o`)}`;
    
    // 4. đáp án sai 3:
    goc = Math.floor((Math.acos(Math.abs(a0*b0+a1*b1)/(Math.sqrt(a0*a0+a1*a1)*Math.sqrt(b1*b1+b0*b0)))/Math.PI)*180) ;
    let dapan3 = `${katex.renderToString(`\\approx ${goc}^o`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HÊT HÀM 8

// 9. KHOẢNG CÁCH TỪ ĐIỂM TỚI ĐƯỜNG
function khoangCach_diemToiDuong(){
    // tạo điểm
    let diem = tenDiem();
    let x0 = soNguyen(20);
    let y0 = soNguyen(20);
    // tạo vecto pháp tuyến
    let a = 1;
    let b = 1;
    while (Math.sqrt(a*a+b*b)!=Math.floor(Math.sqrt(a*a+b*b))|| a*a + b*b ===0) {
        a = soNguyen(20);
        b = soNguyen(20);
    }
    // tạo a, b, c mà (x0; y0) không thuộc ax + by + c = 0
    let  c = soNguyen(20);
    while(a*x0 + b*y0 + c === 0){
        c = soNguyen(20);
    }
    // tinh kết quả:
    let khoangCach = new Fraction(Math.abs(a*x0+b*y0+c),Math.sqrt(a*a + b*b));

    // nội dung câu hỏi:
    content.innerHTML = `Khoảng cách từ điểm ${diem} đến đường thẳng d bằng bao nhiêu? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`${diem} (${x0}; ${y0}); \\: d: ${phuongTrinhTongQuat(a,b,c)}`)}`;

    // 1. đáp án đúng
    let dapan0 = `${katex.renderToString(`${ghiPhanSo(khoangCach)}`)}`;
    
    
    // 2. đáp án sai 1: thiếu trị tuyệt đối ra âm.
    let frac = new Fraction(-Math.abs(a*x0+b*y0+c),Math.sqrt(a*a + b*b));
    let dapan1 = `${katex.renderToString(`${ghiPhanSo(frac)}`)}`;
    
    //3. đáp án sai 2: thiếu chia căn của a*a + b*b
    let dapan2 = `${katex.renderToString(`${khoangCach.tuso}`)}`;
    
    // 4. đáp án sai 3: không có bình phương hoặc không căn,..
    frac = new Fraction(Math.abs(a*x0+b*y0+c),a*a + b*b); // lỡ có a hay b bằng 0 thì trùng đáp án câu đúng.
    let dapan3 = `${katex.renderToString(`${ghiPhanSo(frac)}`)}`;
    if (Math.random()>0.5 || a!=0 || b!=0) {
        dapan3 = `Không tính được.`;
    }
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 9

// 10. HỆ SỐ GÓC
function heSoGoc(){
    // Tọa độ vec tơ pháp tuyến.
    let a = soNguyen(20);
    let b = soNguyen(20);
    while (a*a+b*b===0){
        b = soNguyen(20);
    }
    let c = soNguyen(30);

    // nội dung câu hỏi:
    content.innerHTML = `Hệ số góc của đường thẳng d bằng bao nhiêu? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`d: ${phuongTrinhTongQuat(a,b,c)}`)}`;

    // 1. đáp án đúng
    let dapan0 = `Không có`;
    if (b!=0){
        let frac = new Fraction(-a,b);
        dapan0 = `${katex.renderToString(`${ghiPhanSo(frac)}`)}`;// -a/b
    }    
    
    // 2. đáp án sai 1: chia mà không đối dấu hoặc lấy a
    let dapan1 = ``;
    if (b!=0 & a!=0){ // a, b cùng khác 0 thì sai kiểu: Không đổi dấu.
        let frac = new Fraction(a,b);
        dapan1 = `${katex.renderToString(`${ghiPhanSo(frac)}`)}`;
    }else{
        dapan1 = `${katex.renderToString(`${a}`)}`;
    }
    
    //3. đáp án sai 2: chia ngược b/a hoặc ghi b
    let dapan2 = ``;
    if (a!=0){
        let frac = new Fraction(-b,a);
        dapan2 = `${katex.renderToString(`${ghiPhanSo(frac)}`)}`; // b/a
    } else{
        dapan2 = `${katex.renderToString(`${b}`)}`;
    }
    
    // 4. đáp án sai 3: ghi hệ số tự do c.
    let dapan3 = `${katex.renderToString(`${c}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 10

// 11.  TRUNG TUYẾN TAM GIÁC BIẾT 3 ĐỈNH.
function trungTuyen_3Dinh(){
    // tạo 3 đỉnh tam giác
    let A = [soNguyen(20),soNguyen(20)];
    let B = [soNguyen(20),soNguyen(20)];
    let C = [soNguyen(20),soNguyen(20)];
    while ((B[0]-A[0])*(C[1]-A[1])-(C[0]-A[0])*(B[1]-A[1])===0){
        C = [soNguyen(20),soNguyen(20)];
    }
    let M = [(B[0]+C[0])/2, (B[1]+C[1])/2];

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường trung tuyến kẻ từ A của tam giác ABC? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`A(${A[0]};${A[1]}),\\: B(${B[0]};${B[1]}), \\: C(${C[0]}; ${C[1]})`)}`;

    // 1. đáp án đúng
    let a = M[1]-A[1];
    let b = A[0]-M[0];
    let c = -a*A[0]-b*A[1];
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,c)}`)}`;
       
    // 2. đáp án sai 1: lây chỉ phương làm pháp tuyến.
    dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(-b,a,c)}`)}`;
    
    //3. đáp án sai 2: sai thành đường cao.
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(C[0]-B[0],C[1]-B[1],-(C[0]-B[0])*A[0]-(C[1]-B[1])*A[1])}`)}`;
        
    // 4. đáp án sai 3: ghi hệ số tự do c.
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(-C[1]+B[1],C[0]-B[0],-(-C[1]+B[1])*C[0]-(C[0]-B[0])*C[1])}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HÊT HÀM 11

// 12.  ĐƯỜNG CAO TAM GIÁC BIẾT 3 ĐỈNH.
function duongCao_3Dinh(){
    // tạo 3 đỉnh tam giác
    let A = [soNguyen(20),soNguyen(20)];
    let B = [soNguyen(20),soNguyen(20)];
    let C = [soNguyen(20),soNguyen(20)];
    while ((B[0]-A[0])*(C[1]-A[1])-(C[0]-A[0])*(B[1]-A[1])===0){
        C = [soNguyen(20),soNguyen(20)];
    }
    
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường cao kẻ từ A của tam giác ABC? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`A(${A[0]};${A[1]}),\\: B(${B[0]};${B[1]}), \\: C(${C[0]}; ${C[1]})`)}`;

     // 1. đáp án đúng
    let a = C[0]-B[0];
    let b = C[1]-B[1];
    let c = -a*A[0]-b*A[1];
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,c)}`)}`;
       
    // 2. đáp án sai 1: lấy pháp tuyến làm chỉ phương.
    dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(-b,a,c)}`)}`;
    
    //3. đáp án sai 2: sai thành AB 
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(A[1]-B[1],-A[0]+B[0],-(A[1]-B[1])*A[0]-(-A[0]+B[0])*A[1])}`)}`;
        
    // 4. đáp án sai 3: sai thành AC.
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(-C[1]+A[1],C[0]-A[0],-(-C[1]+A[1])*A[0]-(C[0]-A[0])*A[1])}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 12.

// 13.  TÌM GIAO ĐIỂM 2 ĐƯỜNG THẲNG.
function soGiaoDiem(){
    // tạo pt tổng quát 1.
    let a0 = soNguyen(20);
    let b0 = soNguyen(20);
    while(a0*a0+b0*b0 ===0){
        a0 = soNguyen(20);
        b0 = soNguyen(20);
    }
    let c0 = soNguyen(30);

    // tạo pt tổng quát 2.
    let a1 = soNguyen(20);
    let b1 = soNguyen(20);
    while(a1*a1+b1*b1 ===0){
        a1 = soNguyen(20);
        b1 = soNguyen(20);
    }
    let c1 = soNguyen(30);

    // kiểm tra điều kiện nghiệm:
    let soNghiem = 2; // mặc định vô số nghiệm.
    if (a0*b1-a1*b0 !=0){ // khác 0 thì 1 nghiệm duy nhất. bằng 0 thì có chuyện:
        soNghiem = 1;
    } else {
        if (b0*c1-b1*c0 != 0){ // nếu khác 0 luôn thì vô nghiệm.
            soNghiem = 0;
        }
    }

    // nội dung câu hỏi:
    content.innerHTML = `Tìm số giao điểm của 2 đường thẳng sau đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`d: ${phuongTrinhTongQuat(a0,b0,c0)}; \\: \\Delta: ${phuongTrinhTongQuat(a1,b1,c1)}`)}`;

    // 1. đáp án đúng
    let dapan0 = `${soNghiem}`;
    // 2. đáp án sai 1: 
    let dapan1 = ``;
    // 3. đáp án sai 2: 
    let dapan2 =  ``;
    if(soNghiem===0){
        dapan1 = `1`; dapan2 = `Vô số nghiệm.`
    }
    if (soNghiem===1){
        dapan1 = `0`; dapan2 = `Vô số nghiệm.`
    }
    if (soNghiem===2){
        dapan0 = `Vô số nghiệm.`; dapan1 = `0`; dapan2 = `1`;
    }
    // 4. đáp án sai 3: 
    let dapan3 = `Nghiệm tùy ý.`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HÊT HÀM 13.


// 14.  TÌM TỌA ĐỘ GIAO ĐIỂM 2 ĐƯỜNG THẲNG.
function toaDoGiaoDiem(){
    // tạo pt tổng quát 1.
    let a0 = soNguyen(20);
    let b0 = soNguyen(20);
    while(a0*a0+b0*b0 ===0){
        a0 = soNguyen(20);
        b0 = soNguyen(20);
    }
    let c0 = soNguyen(30);

    // tạo pt tổng quát 2.
    let a1 = soNguyen(20);
    let b1 = soNguyen(20);
    while(a1*a1+b1*b1 ===0){
        a1 = soNguyen(20);
        b1 = soNguyen(20);
    }
    let c1 = soNguyen(30);
    // tạo nghiệm
    let nghiem = [0,0];
    // kiểm tra điều kiện nghiệm:
    let soNghiem = 2; // mặc định vô số nghiệm.
    if (a0*b1-a1*b0 !=0){ // khác 0 thì 1 nghiệm duy nhất. bằng 0 thì có chuyện:
        soNghiem = 1;
        x0 = new Fraction((b0*c1-b1*c0),(a0*b1-a1*b0));
        y0 = new Fraction(-(a0*c1-a1*c0),(a0*b1-a1*b0));
    } else {
        if (b0*c1-b1*c0 != 0){ // nếu khác 0 luôn thì vô nghiệm.
            soNghiem = 0;
        }
    }

    // nội dung câu hỏi:
    content.innerHTML = `Tìm vị trí tương đối của 2 đường thẳng có phương trình sau đây (nêu chúng căt nhau thì tìm tọa độ giao điểm):`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`d: ${phuongTrinhTongQuat(a0,b0,c0)}; \\\\ \\Delta: ${phuongTrinhTongQuat(a1,b1,c1)}`)}`;

    // 1. đáp án đúng
    let dapan0 = ``;
    // 2. đáp án sai 1: 
    let dapan1 = ``;
    // 3. đáp án sai 2: 
    let dapan2 =  ``;
    // 4. đáp án sai 3: 
    let dapan3 = ``;
    // chia trường hợp
    if(soNghiem===0){
        dapan0 = `Không có giao điểm (hai đường song song).`;
        let x1 = soNguyen(10);
        let y1 = new Fraction(0,0);
        if (b0!=0) {
            y1 = new Fraction(-(c0+a0*x1),b0);
        }
        dapan1 = `${katex.renderToString(`(${x1} ; ${ghiPhanSo(y1)})`)}`;
        dapan2 = `Vô số nghiệm (hai đường trùng nhau).`;
        dapan3 = `(${soNguyen(20)} ; ${soNguyen(20)})`;
    }
    if (soNghiem===1){
        dapan0 = `${katex.renderToString(`( ${ghiPhanSo(x0)} ; ${ghiPhanSo(y0)} )`)}`;
        dapan1 = `Không có giao điểm (hai đường song song).`;
        dapan2 = `Vô số nghiệm (hai đường trùng nhau).`;
        dapan3 = `(${soNguyen(20)} ; ${soNguyen(20)})`;
    }
    if (soNghiem===2){
        dapan0 = `Vô số nghiệm (hai đường trùng nhau).`;
        dapan1 = `Không có giao điểm (hai đường song song).`;
        dapan2 = `(${soNguyen(20)} ; ${soNguyen(20)})`;
        dapan3 = `(${soNguyen(20)} ; ${soNguyen(20)})`;
    }
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT CÂU 14.


// 15.  PHƯƠNG TRÌNH ĐƯỜNG TRUNG TRỰC CỦA ĐOẠN THẲNG.
function duongTrungTruc(){
    // tọa độ điểm A.
    let a0 = soNguyen(20);
    let a1 = soNguyen(20);
    // tọa độ trung điểm.
    let m0 = soNguyen(20);
    let m1 = soNguyen(20);
    while (a0===m0 & a1===m1){
        m0 = soNguyen(20);
        m1 = soNguyen(20);
    }
    // tọa độ điểm B.
    let b0 = 2*m0-a0;
    let b1 = 2*m1-a1;

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường trung trực của đoạn AB biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`A(${a0};${a1});\\:\\: B(${b0};${b1})`)}`;

     // 1. đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(b0-a0,b1-a1,-m0*(b0-a0)-m1*(b1-a1))}`)}`;
       
    // 2. đáp án sai 1: qua A.
    dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(b0-a0,b1-a1,-a0*(b0-a0)-a1*(b1-a1))}`)}`;
    
    //3. đáp án sai 2: qua B.
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(b0-a0,b1-a1,-b0*(b0-a0)-b1*(b1-a1))}`)}`;
        
    // 4. đáp án sai 3: đổi ra chỉ phương.
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(b1-a1,a0-b0,-m1*(a0-b0)-m0*(b1-a1))}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT CÂU 15.

// 16.  TÌM CHÂN ĐƯỜNG CAO CỦA TAM GIÁC.
function timChanDuongCao_TamGiac(){
    // tạo 3 đỉnh tam giác
    let A = [soNguyen(20),soNguyen(20)];
    let B = [soNguyen(20),soNguyen(20)];
    let C = [soNguyen(20),soNguyen(20)];
    while ((B[0]-A[0])*(C[1]-A[1])-(C[0]-A[0])*(B[1]-A[1])===0){
        C = [soNguyen(20),soNguyen(20)];
    }
    
    // nội dung câu hỏi:
    content.innerHTML = `Tìm tọa độ chân đường cao H kẻ từ A của tam giác ABC? Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`A(${A[0]};${A[1]}),\\: B(${B[0]};${B[1]}), \\: C(${C[0]}; ${C[1]})`)}`;

    // tính phương trình đường cao
    let a = C[0]-B[0];
    let b = C[1]-B[1];
    let c = -a*A[0]-b*A[1];
    // 1. đáp án đúng
    // tính hoành tung của H:
    let H_x = new Fraction(-b*b*B[0]-a*b*B[1]-a*c,a*a+b*b);
    let H_y = new Fraction(-a*a*B[1]-a*b*B[0]-b*c,a*a+b*b);
    let dapan0 = `${katex.renderToString(`H(${ghiPhanSo(H_x)};${ghiPhanSo(H_y)})`)}`;
       
    // 2. đáp án sai 1: tìm phương trình đường cao.
    dapan1 = `${katex.renderToString(`H:${phuongTrinhTongQuat(a,b,c)}`)}`;
    
    //3. đáp án sai 2: sai thành trung điểm BC.
    let M_x = new Fraction(B[0]+C[0],2);
    let M_y = new Fraction(B[1]+C[1],2);
    let dapan2 = `${katex.renderToString(`H(${ghiPhanSo(M_x)};${ghiPhanSo(M_y)})`)}`;
        
    // 4. đáp án sai 3: sai khi đổi dấu tọa độ của H. \\\\\ Do không chuyển đúng dạng khi bấm máy tính.
    let dau = new Fraction(-1,1);// lấy số âm để nhân đổi dấu.
    let dapan3 = `${katex.renderToString(`H(${ghiPhanSo(nhanPhanSo(H_x,dau))};${ghiPhanSo(nhanPhanSo(H_y,dau))})`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 16.

// 17.  TÌM HÌNH CHIẾU VUÔNG GÓC TỪ ĐIỂM XUỐNG ĐƯỜNG.
function hinhChieuVuongGoc(){
    // tọa độ điểm
    let M0 = soNguyen(20);
    let M1 = soNguyen(20);
    // phương trình tổng quát.
    let a = 1, b =1;
    while (Math.sqrt(a*a+b*b)!=Math.floor(Math.sqrt(a*a+b*b))){
        a = soNguyen(20);
        b = soNguyen(20);
    }
    let c = soNguyen(30);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm tọa độ hình chiếu vuôn góc H của điểm M lên đường thẳng d. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString(`M(${M0};${M1}); \\: \\: d: ${phuongTrinhTongQuat(a,b,c)}`)}`;

    // 1. đáp án đúng
    // tính hoành tung của H:
    let H_x = new Fraction(-b*b*M0-a*b*M1-a*c,a*a+b*b);
    let H_y = new Fraction(-a*a*M1-a*b*M0-b*c,a*a+b*b);
    let dapan0 = `${katex.renderToString(`H(${ghiPhanSo(H_x)};${ghiPhanSo(H_y)})`)}`;
       
    // 2. đáp án sai 1: lấy vecto pháp tuyến làm tọa độ
    dapan1 = `${katex.renderToString(`H:${phuongTrinhTongQuat(a,b,c)}`)}`;
    
    //3. đáp án sai 2: tính khoảng cách
    let distance = new Fraction(Math.abs(a*M0+b*M1+c),Math.round(a*a+b*b));
    let dapan2 = `${katex.renderToString(`${ghiPhanSo(distance)}`)}`;
        
    // 4. đáp án sai 3: quên đổi dấu
    let dau = new Fraction(-1,1);// lấy số âm để nhân đổi dấu.
    let dapan3 = `${katex.renderToString(`H(${ghiPhanSo(nhanPhanSo(H_x,dau))};${ghiPhanSo(nhanPhanSo(H_y,dau))})`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 17.

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*17)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            hoiPhuongTrinhTongQuat_diemDiQua_phapTuyen();
            break;
        case 2:
            hoiPhuongTrinhTongQuat_diemDiQua_chiPhuong();
            break;
        case 3:
            hoiPhuongTrinhThamSo_diemDiQua_chiPhuong();
            break;
        case 4:
            hoiPhuongTrinhThamSo_diemDiQua_phapTuyen();
            break;
        case 5:
            choCP_timPT_nguocLai();
            break;
        case 6:
            choPhuongTrinh_hoiVecto();
            break;
        case 7:
            phuongTrinh_DuongQua2Diem();
            break;
        case 8:
            goc_2DuongThang();
            break;
        case 9:
            khoangCach_diemToiDuong();
            break;
        case 10:
            heSoGoc();
            break;
        case 11:
            trungTuyen_3Dinh();
            break;
        case 12:
            duongCao_3Dinh();
            break;
        case 13:
            soGiaoDiem();
            break;
        case 14:
            toaDoGiaoDiem();
            break;
        case 15:
            duongTrungTruc();
            break;
        case 16:
            timChanDuongCao_TamGiac();
            break;
        case 17:
            hinhChieuVuongGoc();
            break;
    }
});
