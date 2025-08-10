// Lớp 10, chương 9, bài 3. Đường tròn trong mặt phẳng tọa độ.

// 1.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ BÁN KÍNH.
// 2.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ ĐƯỜNG KÍNH.
// 3.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT ĐƯỜNG KÍNH.
// 4.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ ĐIỂM ĐI QUA.
// 5.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ KHOẢNG CÁCH TÂM TỚI ĐƯỜNG.
// 6.   VỊ TRÍ TƯƠNG ĐỐI ĐƯỜNG TRÒN VÀ ĐƯỜNG THẲNG.
// 7.   ĐƯỜNG TRÒN NGOẠI TIẾP TAM GIÁC.
// 8.   TIẾP TUYẾN VỚI ĐƯỜNG TRÒN.
// 9.   CHO PHƯƠNG TRÌNH ĐƯỜNG TRÒN, TÌM TÂM BÁN KÍNH.
// 10.  CHO PHUONG TRÌNH ĐƯỜNG TRÒN, TÌM ĐIỂM THUỘC.




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

// lấy tên diểm ngẫu nhiên
function tenDiem() {
    let tenDiem = [`A`,`B`,`C`,`D`,`F`,`E`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`S`];
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

// hàm ghi phương trình đường tròn. TÂM NGUYÊN và ----BÁN KÍNH BÌNH PHƯƠNG---- là ----PHÂN SỐ----
function phuongTrinhDuongTron(a,b,r2){
    let string = ``;
    // ghi (x-a)^2
    if (a!=0){
        string += `(x`;
        if  (a>0){
            string += `- ${a})^2 +`;
        } else {
            string += `+ ${-a})^2 +`;
        }
    } else {
        string += `x^2 + `;
    }
    // ghi +(y-b)^2
    if (b!=0){
        string += `(y`;
        if (b>0){
            string += `- ${b})^2 = `;
        } else {
            string += ` + ${-b})^2 = `;
        }
    } else {
        string += `y^2 = `;
    }
    // ghi R^2
    string += `${ghiPhanSo(r2)}`;
    return string;
}

// hàm ghi phương trình đường tròn dạng khai triển x^2 + y^2 - 2ax - 2by + c = 0: TÂM NGUYÊN, BÁN KÍNH BÌNH PHƯƠNG là PHÂN SỐ.
function phuongTrinhDuongTron_KhaiTrien(a,b,r2){
    let string =`x^2 + y^2`;
    // ghi -2ax:
    if (a>0){
        string += `-${2*a}x`;
    } else{
        if (a<0){
            string += `+${2*a}x`;
        }
    }
    // ghi -2by
    if (b>0){
        string += `-${2*b}y`;
    } else{
        if (b<0){
            string += `+${2*b}y`;
        }
    }
    // ghi a^2 + b^2 - R^2
    let c = a*a + b*b - r2.tuso;
    if (c>0){
        string +=`+${c} = 0`;
    }else{
        if(c<0){
            string += `${c} = 0`;
        }
    }
    // trả kết quả.
    return string;
}

// 1. PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ BÁN KÍNH
function phuongTrinh_duongTron_tamBanKinh(){

    // Tên điểm ngẫu nhiên
    let tam = tenDiem();
    
    // Tạo tọa độ ngẫu nhiên cho điểm 
    let a = soNguyen(10);
    let b = soNguyen(10);
    // Tạo bán kính ngẫu nhiên
    let r = Math.abs(soNguyen(15));
    while (r===0){
        r = Math.abs(soNguyen(15));
    }
    let R = new Fraction (r,1);
    
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường tròn có tâm ${tam} và bán kính R. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${tam}(${a}; ${b}), \\: R = ${ghiPhanSo(R)}.` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,nhanPhanSo(R,R))}`)}`;

    // 2. đáp án sai 1:
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(-a,-b,nhanPhanSo(R,R))}`)}`;
    
    //3. đáp án sai 2:
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(-a,b,nhanPhanSo(R,R))}`)}`;
    
    // 4. đáp án sai 3: kiểu quên trừ 1 bên hoặc:
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(a,-b,nhanPhanSo(R,R))}`)}`;
    // sai kiểu quên bình phương
    if (R.tuso*R.mauso>1){
        dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R)}`)}`;
    }
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 1.

// 2.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ ĐƯỜNG KÍNH.
function phuongTrinh_duongTron_tamDuongKinh(){
    // tạo tâm, tọa độ
    let tam = tenDiem();
    let a = soNguyen(20);
    let b = soNguyen(20);
    // tạo đường kính
    let d = Math.abs(soNguyen(10));
    while (d===0){
        d = Math.abs(soNguyen(10));
    }
    let duongKinh = new Fraction(d,1);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường tròn có tâm ${tam} và đường kính d. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${tam}(${a}; ${b}), \\\\ d = ${ghiPhanSo(duongKinh)}.` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let hai = new Fraction(2,1);
    let banKinh = chiaPhanSo(duongKinh,hai);
    let banKinhBinhPhuong = nhanPhanSo(banKinh,banKinh);
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,banKinhBinhPhuong)}`)}`;

    // 2. đáp án sai 1: không chia đường kính để tìm bán kính.
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,nhanPhanSo(duongKinh,duongKinh))}`)}`;
    
    //3. đáp án sai 2: lẫn lộn dấu.
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(-a,b,nhanPhanSo(duongKinh,duongKinh))}`)}`;
    if (Math.random()>0.5){
        dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(a,-b,nhanPhanSo(duongKinh,duongKinh))}`)}`;
    }
    
    // 4. đáp án sai 3: lộn dấu cả hai.
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(-a,-b,nhanPhanSo(duongKinh,duongKinh))}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 2.

// 3.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT ĐƯỜNG KÍNH.
function phuongTrinh_duongTron_duongKinh(){
    // Tên điểm ngẫu nhiên
    let A = tenDiem();
    let B = tenDiem();
    while(A===B){
        B = tenDiem();
    }
    
    // Tạo tọa độ ngẫu nhiên cho điểm 
    // điểm 1.
    let a0 = soNguyen(10);
    let a1 = soNguyen(10);
    // tâm
    let r0 = soNguyen(15);
    let r1 = soNguyen(15);
    // điểm 2.
    let b0 = 2*r0 - a0;
    let b1 = 2*r1 - a1;

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường tròn có đường kính là ${A}${B}. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${A}(${a0}; ${a1}),\\:\\:\\: ${B}(${b0} ; ${b1}).` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let R2= new Fraction( (a0-r0)*(a0-r0)+(a1-r1)*(a1-r1) , 1);
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(r0,r1,R2)}`)}`;

    // 2. đáp án sai 1: lấy A hoặc B làm tâm. AB làm bán kính.
    d2 = new Fraction( (a0 - b0)*(a0-b0)+(a1-b1)*(a1-b1) , 1);
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(a0,a1,d2)}`)}`;
    
    //3. đáp án sai 2: tương tự sai 1.
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(b0,b1,d2)}`)}`;
    
    // 4. đáp án sai 3: lấy đúng tâm nhưng bán kính lại là AB
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(r0,r1,d2)}`)}`;
    // hoặc lấy đúng bán kính nhưng tọa độ tâm quên chia đôi tổng
    if(Math.random()>0.5){
        dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(r0*2,r1*2,R2)}`)}`;
    }
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 3.

// 4.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ ĐIỂM ĐI QUA.
function phuongTrinh_duongTron_tamDiemThuoc(){
    // tạo tâm.
    let tam = tenDiem();
    let a = soNguyen(20);
    let b = soNguyen(20);
    // tạo 1 điểm thuộc đường tròn.
    let diem = tenDiem();
    while (diem===tam){
        diem = tenDiem();
    }
    let x0 = soNguyen(15);
    let y0 = soNguyen(15);
    while (a===x0 & b===y0){
        x0 = soNguyen(15);
        y0 = soNguyen(15);
    }

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường tròn có tâm ${tam} và đi qua điểm ${diem} . Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${tam}(${a}; ${b})\\\\ ${diem}(${x0} ; ${y0}).` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let R2= new Fraction( (a-x0)*(a-x0)+(b-y0)*(b-y0) , 1);// tính bán kính bình phương
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R2)}`)}`;

    // 2. đáp án sai 1: lấy diem làm tâm, bán kính vẫn đúng.
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(x0,y0,R2)}`)}`;
    
    //3. đáp án sai 2: lấy độ dài diem làm bán kính.
    let R_dapan2 = new Fraction( x0*x0 + y0*y0, 1);
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R_dapan2)}`)}`;
    
    // 4. đáp án sai 3: độ dài tâm làm bán kính.
    R_dapan2 = new Fraction( a*a + b*b, 1);
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(x0,y0,R_dapan2)}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 4.


// 5.   PHƯƠNG TRÌNH ĐƯỜNG TRÒN BIẾT TÂM VÀ KHOẢNG CÁCH TÂM TỚI ĐƯỜNG.
function phuongTrinh_duongTron_tamKhoangCach(){
    // Chọn tâm
    let tam = tenDiem();
    let a = soNguyen(20);
    let b = soNguyen(20);
    // chọn phương trình tổng quát ax + by + c = 0
    let A = soNguyen(20);
    let B = soNguyen(20);
    let C = soNguyen(20);
    // nếu kiểm tra tâm nằm trên đường thì chọn lại tâm
    while(A*a+B*b +C ===0){
        a = soNguyen(20);
        b = soNguyen(20);
    }
    // tính R bình.
    let R2 = new Fraction((A*a+B*b+C)*(A*a+B*b+C),A*A+B*B); 

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường tròn có tâm ${tam} và tiếp xúc với đường thẳng d . Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `${tam}(${a}; ${b}), \\\\ d: ${phuongTrinhTongQuat(A,B,C)}.` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R2)}`)}`;

    // 2. đáp án sai 1: lấy độ dài tâm làm bán kính
    let R_dapan2 = new Fraction(a*a+b*b,1);
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R_dapan2)}`)}`;
    
    //3. đáp án sai 2: chia đôi khoảng cách.
    let hai = new Fraction(2,1);
    R_dapan2 = chiaPhanSo(R_dapan2,hai);
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R_dapan2)}`)}`;
    
    // 4. đáp án sai 3: lấy khoảng cách là A^2 + B^2.
    R_dapan2 = new Fraction(A*A+B*B,1)
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(a,b,R_dapan2)}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 5.

// 6.   VỊ TRÍ TƯƠNG ĐỐI ĐƯỜNG TRÒN VÀ ĐƯỜNG THẲNG.
function viTriTuongDoi(){
     // Chọn tâm
    let tam = tenDiem();
    let a = soNguyen(20);
    let b = soNguyen(20);
    let R = new Fraction (soNguyenKhac0(7),1);
    // chọn phương trình tổng quát ax + by + c = 0
    let A = soNguyen(20);
    let B = soNguyen(20);
    let C = soNguyen(20);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm vị trí tương đối của đường tròn (C) và đường thẳng d. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `(C): ${phuongTrinhDuongTron(A,B,nhanPhanSo(R,R))}, \\\\ d: ${phuongTrinhTongQuat(A,B,C)}.` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = ``;
    // 2. đáp án sai 1: lấy độ dài tâm làm bán kính
    let dapan1 = ``;
    //3. đáp án sai 2: chia đôi khoảng cách.
    let dapan2 = ``;
    let khoangCach = Math.abs(A*a+B*b+C.tuso)/Math.sqrt(A*A+B*B);
    if(khoangCach>R){
        dapan0 = `Không cắt nhau.`; dapan1 = `Cắt nhau.`; dapan2 = `Tiếp xúc nhau.`;
    } else{
        if(khoangCach<R){
            dapan0 = `Cắt nhau.`; dapan1 = `Không cắt nhau.`; dapan2 = `Tiếp xúc nhau.`;
        } else{
            dapan0 = `Tiếp xúc nhau.`; dapan1 = `Cắt nhau.`; dapan2 = `Không cắt nhau.`;
        }
    }
    // 4. đáp án sai 3: lấy khoảng cách là A^2 + B^2.
    let dapan3 = `Tất cả sai.`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 6.

// 7.   ĐƯỜNG TRÒN NGOẠI TIẾP TAM GIÁC. 
function duongTronNgoaiTiepTamGiac() {// HÀM TRẢ VỀ CÁC ĐỈNH NGUYÊN VÀ TÂM NGUYÊN.
    // mặc định 3 diểm A, B, C luôn.
    // lấy tọa độ tâm trước.
    let I0 = soNguyen(10);
    let I1 = soNguyen(10);
    // lấy vec tơ để tạo 3 đỉnh tam giác.
    let vec0 = soNguyenKhac0(20);
    let vec1 = soNguyenKhac0(20);
    let R2 = new Fraction(vec0*vec0+vec1*vec1,1);
    // tạo 3 đỉnh:
    // A
    let A0 = I0+vec0;
    let A1 = I1+vec1;
    // B
    let B0 = I0+vec0;
    let B1 = I0-vec1;
    // C
    let C0 = I0-vec0;
    let C1 = I0+vec1;
    
    // nội dung câu hỏi:
    content.innerHTML = `Viết phương trình đường tròn ngoại tiếp tam giác ABC. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `A(${A0};${A1}),\\:\\: B(${B0};${B1});\\:\\: C(${C0};${C1}).` );
    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhDuongTron(I0,I1,R2)}`)}`;

    // 2. đáp án sai 1: lấy 1 đỉnh làm tâm luôn
    let R_dapan2 = new Fraction((A0-B0)*(A0-B0)+(A1-B1)*(A1-B1), 1);
    let dapan1 = `${katex.renderToString(`${phuongTrinhDuongTron(A0,A1,R_dapan2)}`)}`;

    //3. đáp án sai 2: lấy đỉnh khác làm tâm
    R_dapan2 = new Fraction((C0-B0)*(C0-B0)+(C1-B1)*(C1-B1), 1);
    let dapan2 = `${katex.renderToString(`${phuongTrinhDuongTron(B0,B1,R_dapan2)}`)}`;

    // 4. đáp án sai 3: lấy đỉnh khác làm tâm nữa
    R_dapan2 = new Fraction((C0-A0)*(C0-A0)+(C1-A1)*(C1-A1), 1);
    let dapan3 = `${katex.renderToString(`${phuongTrinhDuongTron(C0,C1,R_dapan2)}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 7.


// 8.   TIẾP TUYẾN VỚI ĐƯỜNG TRÒN.
function tiepTuyen(){
    // tạo tâm
    let a = soNguyen(20);
    let b = soNguyen(20);
    // tạo điểm
    let diem = tenDiem();
    while(diem===`I`){
        diem = tenDiem();
    }
    let x0 = soNguyen(20);
    let y0 = soNguyen(20);
    // kiểm tra điểm nằm trên khác tâm.
    while(a===x0 & b===y0){
        x0 = soNguyen(20);
        y0 = soNguyen(20);
    }
    // tính bình phương bán kính.
    let R2 = new Fraction((a-x0)*(a-x0) + (b-y0)*(b-y0),1);

    // nội dung câu hỏi:
    content.innerHTML = `Viết phương trình tiếp tuyến với đường tròn (C) tâm I tại điểm ${diem}. Biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `(C):${phuongTrinhDuongTron(a,b,R2)}; \\:\\: ${diem}(${x0};${y0}).` );

     
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${phuongTrinhTongQuat(a-x0,b-y0,-x0*(a-x0) - y0*(b-y0))}`)}`;

    // 2. đáp án sai 1: sai dấu cộng
    let dapan1 = `${katex.renderToString(`${phuongTrinhTongQuat(a+x0,b+y0,x0*(a+x0) +y0*(b+y0))}`)}`;

    //3. đáp án sai 2: lấy vec tơ pháp tuyến là tâm (a,b) còn điểm đi qua là (x0,y0).
    let dapan2 = `${katex.renderToString(`${phuongTrinhTongQuat(a,b,-a*x0-b*y0)}`)}`;

    // 4. đáp án sai 3: 
    let dapan3 = `${katex.renderToString(`${phuongTrinhTongQuat(a-x0,b-y0,x0*(a-x0) + y0*(b-y0))}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 8.

// 9.   CHO PHƯƠNG TRÌNH ĐƯỜNG TRÒN, TÌM TÂM.
function timTamBanKinh_DuongTron(){
    // tạo tâm:
    let a = soNguyen(20);
    let b = soNguyen(20);
    // bán kính:
    let R2 = new Fraction(Math.abs(soNguyenKhac0(20)),1);

    // nội dung câu hỏi:
    content.innerHTML = ` Tìm tâm I và bán kính của đường tròn (C) biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `(C):${phuongTrinhDuongTron(a,b,R2)}.` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`I(${a};${b}); \\: R = ${ghiCanBacHai(R2.tuso)}`)}`;

    // 2. đáp án sai 1: không đổi dấu, đúng R.
    let dapan1 = `${katex.renderToString(`I(${-a};${-b}); \\: R = ${ghiCanBacHai(R2.tuso)}`)}`;

    //3. đáp án sai 2: đúng tâm, R quên lấy căn.
    let dapan2 = `${katex.renderToString(`I(${b};${a}); \\: R = ${R2.tuso}`)}`;

    // 4. đáp án sai 3: đổi dấu (-a, -b) và quên lấy căn R.
    let dapan3 = `${katex.renderToString(`I(${-a};${-b}); \\: R = ${R2.tuso}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 9.

// 10.  CHO PHUONG TRÌNH ĐƯỜNG TRÒN, TÌM ĐIỂM THUỘC.
function diemThuocDuongTron(){
    // tọa độ tâm
    let a = soNguyen(20);
    let b = soNguyen(20);
    // bán kính bình phương
    let R2 = new Fraction(Math.abs(soNguyenKhac0(20)),1);

    // nội dung câu hỏi:
    content.innerHTML = ` Điểm nào sau đây nằm trên đường tròn (C) biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `(C):${phuongTrinhDuongTron(a,b,R2)}.` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    // chọn tọa độ điểm đúng:
    let M = Math.abs(soNguyen(R2.tuso));
    let N = R2.tuso - M;
    let dapan0 = `${katex.renderToString(` A( ${a} + ${ghiCanBacHai(M)} ; ${b}+${ghiCanBacHai(N)} ) `)}`;

    // 2. đáp án sai 1: đổi dấu a, b ở câu đúng
    let dapan1 = `${katex.renderToString(` A( ${-a} + ${ghiCanBacHai(M)} ; ${-b}+${ghiCanBacHai(N)} ) `)}`;

    //3. đáp án sai 2: lấy số nguyên mà không thỏa
    M = uocChinhPhuong(R2.tuso);
    N += 1;
    let dapan2 = `${katex.renderToString(` A( ${a} + ${ghiCanBacHai(M)} ; ${b}+${ghiCanBacHai(N)} ) `)}`;

    // 4. đáp án sai 3: cho M^2+N^2 gần R2 nhất nhưng không bằng R2.
    let hieu = R.tuso;
    for (let M=0; M<=R2.tuso;M++){
        for (let N = 0; M<=R2.tuso;N++){
            let tam = M*M + N*N-R2.tuso;
            if ( tam !=0 & hieu > tam ){
                hieu == tam;
            }
        }
    }
    let dapan3 = `${katex.renderToString(` A( ${a} - ${ghiCanBacHai(M)} ; ${b} + ${ghiCanBacHai(N)} ) `)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 10.

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*10)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            phuongTrinh_duongTron_tamBanKinh();
            break;
        case 2:
            phuongTrinh_duongTron_tamDuongKinh();
            break;
        case 3:
            phuongTrinh_duongTron_duongKinh();
            break;
        case 4:
            phuongTrinh_duongTron_tamDiemThuoc();
            break;
        case 5:
            phuongTrinh_duongTron_tamKhoangCach();
            break;
        case 6:
            viTriTuongDoi();
            break;
        case 7:
            duongTronNgoaiTiepTamGiac();
            break;
        case 8:
            tiepTuyen();
            break;
        case 9:
            timTamBanKinh_DuongTron();
            break;
        case 10:
            diemThuocDuongTron();
            break;
    }
});
