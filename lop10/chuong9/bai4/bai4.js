// Lớp 10, chương 9, bài 4. Ba đường conic trong mặt phẳng tọa độ.

// 1.   PHƯƠNG TRÌNH ELIP BIẾT 2 BÁN TRỤC LỚN VÀ NHỎ.
// 2.   PHƯƠNG TRÌNH ELIP BIẾT 1 BÁN TRỤC LỚN VÀ TIÊU CỰ.
// 3.   PHƯƠNG TRÌNH ELIP BIẾT 1 BÁN TRỤC NHỎ VÀ TIÊU CỰ.
// 4.   PHƯƠNG TRÌNH ELIP BIẾT 2 TRỤC LỚN VÀ NHỎ.
// 5.   PHƯƠNG TRÌNH ELIP BIẾT TIÊU ĐIỂM VÀ 1 ĐỈNH.
// 6.   PHƯƠNG TRÌNH HYPERBOL BIẾT BÁN TRỤC THỰC VÀ BÁN TRỤC ẢO.
// 7.   PHƯƠNG TRÌNH HYPERBOL BIẾT 1 BÁN TRỤC THỰC VÀ TIÊU CỰ.
// 8.   PHƯƠNG TRÌNH HYPERBOL BIẾT 1 BÁN TRỤC ẢO VÀ TIÊU CỰ.
// 9.   PHƯƠNG TRÌNH HYPERBOL BIẾT 2 TRỤC THỰC VÀ ẢO.
// 10.  PHƯƠNG TRÌNH HYPERBOL BIẾT TIÊU ĐIỂM VÀ ĐỈNH.
// 11.  PHƯƠNG TRÌNH PARABOL BIẾT THAM SỐ TIÊU.
// 12.  TÌM TRỤC LỚN, TRỤC NHỎ, TIÊU CỰ CỦA ELIP.
// 13.  TÌM TRỤC VÀ TIÊU CỰ HYPERBOL.




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

// hàm ghi phương trình đường elip: VỚI ĐẦU VÀO là BÌNH PHƯƠNG hai trục
function phuongTrinhElip(a,b){
    let string = `\\dfrac{x^2}{${ghiPhanSo(a)}}+\\dfrac{y^2}{${ghiPhanSo(b)}} = 1`;
    return string;
}

// hàm ghi phương trình đường hyperbol: ĐẦU VÀO cũng BÌNH PHƯƠNG 2 TRỤC.
function phuongTrinhHypebol(a,b){ 
    let string = `\\dfrac{x^2}{${ghiPhanSo(a)}}-\\dfrac{y^2}{${ghiPhanSo(b)}} = 1`;
    return string;
}

// hàm ghi phương trình parabol biết tham số tiêu.
function phuongTrinhParabol(p){
    let hai = new Fraction(2,1);
    let string = `y^2 = ${ghiPhanSo(nhanPhanSo(p,hai))}x`;
    return string;
}

// hàm ghi phương trình parabol biết tham số tiêu MÀ SAI DẠNG.
function phuongTrinhParabolSai(p){
    let hai = new Fraction(2,1);
    let string = `y = ${ghiPhanSo(nhanPhanSo(p,hai))}x^2`;
    return string;
}

// 1. PHƯƠNG TRÌNH ELIP BIẾT 2 BÁN TRỤC LỚN VÀ NHỎ.
function phuongTrinh_elip_2banTruc(){
    // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường elip biết độ dài bán trục lớn và nhỏ lần lượt là:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `a = ${ghiPhanSo(a)};\\:\\: b = ${ghiPhanSo(b)}.` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhElip( nhanPhanSo(a,a),nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lộn qua hyperbol
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a),nhanPhanSo(b,b) )}`)}`;
   
    //3. đáp án sai 2: không bình phương
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( a,b )}`)}`;
    
    // 4. đáp án sai 3: lộn qua hyperbol và không bình phương.
    let dapan3 = `${katex.renderToString(`${phuongTrinhHypebol( a,b )}`)}`;
    // nếu a khác b thì sai kiểu đảo ngược 2 trục.
    if(a.tuso!=b.tuso){
        dapan3 = `${katex.renderToString(`${phuongTrinhElip( b, a )}`)}`;
    }
    
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 1.

// 2. PHƯƠNG TRÌNH ELIP BIẾT 1 BÁN TRỤC LỚN VÀ TIÊU CỰ.
function phuongTrinh_elip_banTrucLon_tieuCu(){
    // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
    // tính tiêu cự bình phương.
    let c2 = new Fraction(1,1);
    c2 = truPhanSo(nhanPhanSo(a,a) , nhanPhanSo(b,b));

   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường elip biết độ dài bán trục lớn a và tiêu cự c lần lượt là:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `a = ${ghiPhanSo(a)};\\:\\: c = ${ghiCanBacHai(c2.tuso)}.` )}`;

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhElip( nhanPhanSo(a,a),nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lộn qua hyperbol
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a),nhanPhanSo(b,b) )}`)}`;

    //3. đáp án sai 2: lấy tiêu cự c làm bán trục nhỏ.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , c2 )}`)}`;

    // 4. đáp án sai 3: đúng phương trình elip nhưng ngược a, b
    let dapan3 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(b,b) , nhanPhanSo(a,a) )}`)}`;

    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 2.

// 3. PHƯƠNG TRÌNH ELIP BIẾT 1 BÁN TRỤC NHỎ VÀ TIÊU CỰ.
function phuongTrinh_elip_banTrucNho_tieuCu(){
    // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
    // tính tiêu cự bình phương.
    let c2 = new Fraction(1,1);
    c2 = truPhanSo(nhanPhanSo(a,a) , nhanPhanSo(b,b));

   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường elip biết độ dài bán trục nhỏ b và tiêu cự c lần lượt là:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `b = ${ghiPhanSo(b)};\\:\\: c = ${ghiCanBacHai(c2.tuso)}.` )}`;

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhElip( nhanPhanSo(a,a),nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lộn qua hyperbol
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a),nhanPhanSo(b,b) )}`)}`;

    //3. đáp án sai 2: lấy tiêu cự c làm bán trục nhỏ.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(b,b) , c2 )}`)}`;

    // 4. đáp án sai 3: lấy c và b làm bán lớn và nhỏ.
    let dapan3 = `${katex.renderToString(`${phuongTrinhHypebol( c2 , nhanPhanSo(b,b) )}`)}`;

    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 3

// 4. PHƯƠNG TRÌNH ELIP BIẾT 2 TRỤC LỚN VÀ NHỎ.
function phuongTrinh_elip_2Truc(){
    // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
    let hai = new Fraction(2,1);
    let bon = new Fraction(4,1);
   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường elip biết độ dài trục lớn và nhỏ lần lượt là:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( `2a = ${ghiPhanSo(nhanPhanSo(hai,a))};\\:\\: 2b = ${ghiPhanSo(nhanPhanSo(hai,b))}.` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhElip( nhanPhanSo(a,a),nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lộn qua hyperbol
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a),nhanPhanSo(b,b) )}`)}`;
   
    //3. đáp án sai 2: lấy trục làm bán trục
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(nhanPhanSo(a,a),bon),nhanPhanSo(nhanPhanSo(b,b),bon) )}`)}`;
    
    // 4. đáp án sai 3: lấy trục làm bán trục và không bình phương
    let dapan3 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,hai),nhanPhanSo(b,hai) )}`)}`;
    
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 4.

// 5. PHƯƠNG TRÌNH ELIP BIẾT TIÊU ĐIỂM VÀ 1 ĐỈNH.
function phuongTrinh_elip_tieuCu_dinh(){
     // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
    // tính tiêu cự bình phương.
    let c2 = new Fraction(1,1);
    c2 = truPhanSo(nhanPhanSo(a,a) , nhanPhanSo(b,b));

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường elip biết 1 tiêu điểm và 1 đỉnh có tọa độ lần lượt là:`;
    // Dữ kiện cho trong câu hỏi:
    let noidapan0 = `F(${ghiCanBacHai(c2)};0)`;
    if(Math.random()>0.5){
        noidapan0 = `F(-${ghiCanBacHai(c2)};0)`;
    }
    noidapan0 += `;\\:\\: A(${kyHieuDau()}${ghiPhanSo(a)};0)`;
    if(Math.random()>0.5){
        noidapan0 += `;\\:\\: B(0;${kyHieuDau()}${ghiPhanSo(b)})`;
    }
    equation.innerHTML = `${katex.renderToString( `${noidapan0}` )}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhElip( nhanPhanSo(a,a),nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lấy tiêu cự làm bán trục
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( c2,nhanPhanSo(b,b) )}`)}`;

    //3. đáp án sai 2: lấy tiêu cự c làm bán trục nhỏ.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(b,b) , c2 )}`)}`;

    // 4. đáp án sai 3: lấy c và b làm bán lớn và nhỏ.
    let dapan3 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a) , c2 )}`)}`;

    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 5.

// 6. PHƯƠNG TRÌNH HYPERBOL BIẾT BÁN TRỤC THỰC VÀ BÁN TRỤC ẢO.
function phuongTrinh_hyperbol_2banTruc(){
    // tạo 2 bán trục và bình phương tiêu cự.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường hyperbol biết 2 bán trục thực và ảo cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `a = ${ghiPhanSo(a)}; \\:\\: b = ${ghiPhanSo(b)}` )}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhHypebol( nhanPhanSo(a,a) , nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: đảo vị trí.
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(b,b) , nhanPhanSo(a,a) )}`)}`;

    //3. đáp án sai 2: qua elip.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , nhanPhanSo(b,b) )}`)}`;

    // 4. đáp án sai 3: quên bình phương
    let dapan3 = `${katex.renderToString(`${phuongTrinhElip( a , b )}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 6.

// 7.   PHƯƠNG TRÌNH HYPERBOL BIẾT 1 BÁN TRỤC THỰC VÀ TIÊU CỰ.
function phuongTrinh_hyperbol_banTrucThuc_tieuCu(){
    // tạo 2 bán trục và bình phương tiêu cự.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let c2 = nhanPhanSo(a,a) + nhanPhanSo(b,b);// LÀ PHÂN SỐ.

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường hyperbol biết bán trục thực và tiêu cự cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `a = ${ghiPhanSo(a)}; \\:\\: c = ${ghiCanBacHai(c2.tuso)}` )}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhHypebol( nhanPhanSo(a,a) , nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lấy tiêu cự làm bán trục ảo.
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a) , c2 )}`)}`;

    //3. đáp án sai 2: lộn qua elip.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , nhanPhanSo(b,b) )}`)}`;

    // 4. đáp án sai 3: quên bình phương.
    let dapan3 = `${katex.renderToString(`${phuongTrinhElip( a , b)}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 7.

// 8.   PHƯƠNG TRÌNH HYPERBOL BIẾT 1 BÁN TRỤC ẢO VÀ TIÊU CỰ.
function phuongTrinh_hyperbol_banTrucAo_tieuCu(){
    // tạo 2 bán trục và bình phương tiêu cự.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let c2 = nhanPhanSo(a,a) + nhanPhanSo(b,b);// LÀ PHÂN SỐ.

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường hyperbol biết bán trục ảo và tiêu cự cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `b = ${ghiPhanSo(a)}; \\:\\: c = ${ghiCanBacHai(c2.tuso)}` )}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhHypebol( nhanPhanSo(a,a) , nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lấy b làm bán thực, tiêu cự làm bán trục ảo.
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(b,b) , c2 )}`)}`;

    //3. đáp án sai 2: lộn qua elip.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , nhanPhanSo(b,b) )}`)}`;

    // 4. đáp án sai 3: quên bình phương.
    let dapan3 = `${katex.renderToString(`${phuongTrinhElip( a , b)}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
//HẾT HÀM 8

// 9.   PHƯƠNG TRÌNH HYPERBOL BIẾT 2 TRỤC THỰC VÀ ẢO.
function phuongTrinh_hyperbol_trucThuc_trucAo(){
    // tạo 2 bán trục và bình phương tiêu cự.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let hai = new Fraction(2,1);
    let bon = new Fraction(4,1);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường hyperbol biết trục thực và trục ảo cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `2a = ${ghiPhanSo(nhanPhanSo(a,hai))}; \\:\\: 2b = ${ghiPhanSo(nhanPhanSo(b,hai))}` )}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhHypebol( nhanPhanSo(a,a) , nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: không chia đôi.
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(nhanPhanSo(a,a),bon), nhanPhanSo(nhanPhanSo(b,b),bon) )}`)}`;

    //3. đáp án sai 2: lộn qua elip.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , nhanPhanSo(b,b) )}`)}`;

    // 4. đáp án sai 3: quên chia đôi và quên bình phương.
    let dapan3 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,hai) , nhanPhanSo(b,hai) )}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 9.

// 10.  PHƯƠNG TRÌNH HYPERBOL BIẾT TIÊU ĐIỂM VÀ ĐỈNH.
function phuongTrinh_hyperbol_tieuDiem_dinh(){
    // tạo 2 bán trục và bình phương tiêu cự.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let c2 = nhanPhanSo(a,a) + nhanPhanSo(b,b);// LÀ PHÂN SỐ.

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường hyperbol biết 1 tiêu điểm và 1 đỉnh có tọa độ cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    let noidapan0 =`A (${kyHieuDau()}${ghiPhanSo(a)};0); \\:\\: F(${kyHieuDau()}${ghiCanBacHai(c2)};0)`;
    equation.innerHTML = `${katex.renderToString( `${noidapan0}`)}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhHypebol( nhanPhanSo(a,a) , nhanPhanSo(b,b) ) }`)}`;

    // 2. đáp án sai 1: lấy c làm bán trục ảo
    let dapan1 = `${katex.renderToString(`${phuongTrinhHypebol( nhanPhanSo(a,a), c2 )}`)}`;

    //3. đáp án sai 2: lộn qua elip.
    let dapan2 = `${katex.renderToString(`${phuongTrinhElip( nhanPhanSo(a,a) , nhanPhanSo(b,b) )}`)}`;

    // 4. đáp án sai 3: ngược a với c.
    let dapan3 = `${katex.renderToString(`${phuongTrinhElip( c2, nhanPhanSo(a,a) )}`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 10.

// 11.  PHƯƠNG TRÌNH PARABOL BIẾT THAM SỐ TIÊU.
function phuongTrinh_parabol_thamSoTieu(){
    // tạo tham số tiêu.
    let p = new Fraction( Math.abs(soNguyenKhac0(20)) , Math.abs(soNguyenKhac0(4)) );

    // nội dung câu hỏi:
    content.innerHTML = `Tìm phương trình đường parabol biết tham số qua tiêu là:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `p = ${ghiPhanSo(p)}.`)}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ phuongTrinhParabol(p) }`)}`;

    // 2. đáp án sai 1: quên nhân đôi
    let hai = new Fraction(2,1);
    let dapan1 = `${katex.renderToString(`${ phuongTrinhParabol(chiaPhanSo(p,hai)) }`)}`;

    //3. đáp án sai 2: chia đôi.
    let dapan2 = `${katex.renderToString(`${ phuongTrinhParabolSai(chiaPhanSo(p,hai)) }`)}`;

    // 4. đáp án sai 3: sai dạng chính tắc y =2p.x^2
    let dapan3 = `${katex.renderToString(`${ phuongTrinhParabolSai(p) }`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 11.

// 12.  TÌM TRỤC LỚN, TRỤC NHỎ, TIÊU CỰ CỦA ELIP.
function timTruc_tieuCu_Elip(){
    // tạo 2 bán trục số nguyên thỏa a>b>0.
    let a = new Fraction(Math.abs(soNguyen(20))+2,1); //a >=2.
    let b = new Fraction(a.tuso - Math.abs(soNguyenKhac0(a.tuso-1)),1);
    let c2 = a.tuso*a.tuo - b.tuso*b.tuso;
   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm độ dài trục lớn, trục nhỏ và tiêu cự của elip:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( ` ${ phuongTrinhElip(a , b) }. ` );

    
    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let hai = new Fraction(2,1);
    let dapan0 = `${katex.renderToString(`2a = ${ghiPhanSo(nhanPhanSo(hai,a))}; 2b = ${ghiPhanSo(nhanPhanSo(hai,b))}; c = ${ghiCanBacHai(c2)}`)}`;

    // 2. đáp án sai 1: không nhân đôi
    let dapan1 = `${katex.renderToString(`2a = ${ghiPhanSo(a)}; 2b = ${ghiPhanSo(b)}; c = ${ghiCanBacHai(c2)}`)}`;
   
    //3. đáp án sai 2: để luôn bình phương a^2, b^2 và c đúng.
    let dapan2 = `${katex.renderToString(`2a = ${ghiPhanSo(nhanPhanSo(a,a))}; 2b = ${ghiPhanSo(nhanPhanSo(b,b))}; c = ${ghiCanBacHai(c2)}`)}`;
    
    // 4. đáp án sai 3: dúng a, b nhưng c nhân đôi.
    let dapan3 = `${katex.renderToString(` 2a = ${ghiPhanSo(nhanPhanSo(hai,a))}; 2b = ${ghiPhanSo(nhanPhanSo(hai,b))}; c = ${c2} `)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 12.

// 13.  TÌM TRỤC VÀ TIÊU CỰ HYPERBOL.
function timTruc_tieuCu_Hyperbol(){
    // tạo 2 bán trục số nguyên a>0 và b>0.
    let a = new Fraction(Math.abs(soNguyenKhac0(20)),1); //a >=2.
    let b = new Fraction(Math.abs(soNguyenKhac0(20)),1);
    let c2 = a.tuso*a.tuo + b.tuso*b.tuso;
   
    // nội dung câu hỏi:
    content.innerHTML = `Tìm độ dài trục thực, trục ảo và tiêu cự của hyperbol:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = katex.renderToString( ` ${ phuongTrinhHypebol(a , b) }. ` );

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let hai = new Fraction(2,1);
    let dapan0 = `${katex.renderToString(`2a = ${ghiPhanSo(nhanPhanSo(hai,a))}; 2b = ${ghiPhanSo(nhanPhanSo(hai,b))}; c = ${ghiCanBacHai(c2)}`)}`;

    // 2. đáp án sai 1: không nhân đôi
    let dapan1 = `${katex.renderToString(`2a = ${ghiPhanSo(a)}; 2b = ${ghiPhanSo(b)}; c = ${ghiCanBacHai(c2)}`)}`;
   
    //3. đáp án sai 2: để luôn bình phương a^2, b^2 và c đúng.
    let dapan2 = `${katex.renderToString(`2a = ${ghiPhanSo(nhanPhanSo(a,a))}; 2b = ${ghiPhanSo(nhanPhanSo(b,b))}; c = ${ghiCanBacHai(c2)}`)}`;
    
    // 4. đáp án sai 3: dúng a, b nhưng c nhân đôi.
    let dapan3 = `${katex.renderToString(` 2a = ${ghiPhanSo(nhanPhanSo(hai,a))}; 2b = ${ghiPhanSo(nhanPhanSo(hai,b))}; c = ${c2} `)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 13.

// 14.  TÌM THAM SỐ TIÊU CỦA PARABOL
function timThamSoTieu_Parabol(){
    // tạo tham số tiêu.
    let p = new Fraction( Math.abs(soNguyenKhac0(20)) , Math.abs(soNguyenKhac0(4)) );

    // nội dung câu hỏi:
    content.innerHTML = `Tìm tham số tiêu của parabol có phương trình sau đây:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = `${katex.renderToString( `${phuongTrinhParabol(p)}`)}`;

    //tạo các lựa chọn.
    // 1.  đáp án đúng
    let dapan0 = `${katex.renderToString(`${ ghiPhanSo(p) }`)}`;

    // 2. đáp án sai 1: để nguyên tham số của x. (tức p nhân 2)
    let hai = new Fraction(2,1);
    let dapan1 = `${katex.renderToString(`${ ghiPhanSo(nhanPhanSo(p,hai)) }`)}`;

    //3. đáp án sai 2: chia đôi p (tức tham số x chia 4)
    let dapan2 = `${katex.renderToString(`${ ghiPhanSo(chiaPhanSo(p,hai)) }`)}`;

    // 4. đáp án sai 3: bình phương tham số.
    let dapan3 = `${katex.renderToString(`${ ghiPhanSo(nhanPhanSo(p,p)) }`)}`;
    // hết tạo lựa chọn.

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapan0,dapan1,dapan2,dapan3,1);
}
// HẾT HÀM 14

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*14)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            phuongTrinh_elip_2banTruc();
            break;
        case 2:
            phuongTrinh_elip_banTrucLon_tieuCu();
            break;
        case 3:
            phuongTrinh_elip_banTrucNho_tieuCu();
            break;
        case 4:
            phuongTrinh_elip_2Truc();
            break;
        case 5:
            phuongTrinh_elip_tieuCu_dinh();
            break;
        case 6:
            phuongTrinh_hyperbol_2banTruc();
            break;
        case 7:
            phuongTrinh_hyperbol_banTrucThuc_tieuCu();
            break;
        case 8:
            phuongTrinh_hyperbol_banTrucAo_tieuCu();
            break;
        case 9:
            phuongTrinh_hyperbol_trucThuc_trucAo();
            break;
        case 10:
            phuongTrinh_hyperbol_tieuDiem_dinh();
        case 11:
            phuongTrinh_parabol_thamSoTieu();
            break;
        case 12:
            timTruc_tieuCu_Elip();
            break;
        case 13:
            timTruc_tieuCu_Hyperbol();
            break;
        case 14:
            timThamSoTieu_Parabol();
            break;
    }
});
