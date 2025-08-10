// Lớp 10. Chương 1. Bài 2. Tập hợp.

// 1. TÌM PHÉP TOÁN GIỮA 2 TẬP CON ĐẶC BIỆT CỦA R.
// 2. TÌM PHÉP TOÁN GIỮA 2 TẬP CON DẠNG LIỆT KÊ.
// 3. LIỆT KÊ TẬP CON CHO BỞI ĐIỀU KIỆN { X \IN R or N or Z VÀ THỎA |X| < = > SỐ NÀO ĐÓ. }
// 4. HỎI ĐOẠN, KHOẢN, NỬA KHOẢNG KHI BIẾT MÔ TẢ.

// HÀM SO SÁNH HAI ĐẦU MÚT CỦA ĐOẠN, KHOẢNG, NỬA KHOẢNG.
function soSanh_2DauMut(ngoac1,so1,ngoac2,so2){
    let ketQua =``;
    if (so1==='-\\infty'){// 1. Nếu số so1  = -infty luôn hoặc nhỏ hơn hoặc bằng
        if (so2 ==='-\\infty'){
            ketQua = '=';
        }else{
            ketQua = '<';
        }
    } else {
        if (so1==='+\\infty'){// 2. nếu số so1 = +infty luôn hoặc lớn hơn hoặc bằng
            if (so2==='+\\infty'){
                ketQua = '=';
            } else {
                ketQua = '>';
            }
        } else {// 3. khi "so1" là con số thực:
            if (so2==='+\\infty'){// so2 là +infty  thì nhỏ hơn
                ketQua = '<';
            } else {
                if (so2==='-\\infty'){// so2 là -infty thì lớn hơn
                    ketQua = '>';
                } else { // nếu so2 là số thực luôn thì:
                    if (so1<so2){// số nhỏ hơn thì nhỏ hơn.
                        ketQua = '<';
                    } else {
                        if (so1>so2){// ngược lại lớn hơn thì lớn hơn.
                            ketQua =  '>';
                        } else {// nếu 2 số so1 = so2 thì xét dấu ngoặc:
                            switch(ngoac1){
                                case ')':
                                    switch (ngoac2){
                                        case ')':
                                            ketQua =  '=';
                                            break;
                                        case '(':
                                            ketQua =  '<';
                                            break;
                                        case '[':
                                            ketQua =  '<';
                                            break;
                                        case ']':
                                            ketQua =  '<';
                                            break;
                                    }
                                    break;
                                case '(':
                                    switch (ngoac2){
                                        case ')':
                                            ketQua =  '>';
                                            break;
                                        case '(':
                                            ketQua =  '=';
                                            break;
                                        case '[':
                                            ketQua =  '>';
                                            break;
                                        case ']':
                                            ketQua =  '>';
                                            break;
                                    }
                                    break;
                                case ']':
                                    switch (ngoac2){
                                        case ')':
                                            ketQua =  '>';
                                            break;
                                        case '(':
                                            ketQua =  '<';
                                            break;
                                        case '[':
                                            ketQua =  '=';
                                            break;
                                        case ']':
                                            ketQua =  '=';
                                            break;
                                    }
                                    break;
                                case '[':
                                    switch (ngoac2){
                                        case ')':
                                            ketQua =  '>';
                                            break;
                                        case '(':
                                            ketQua =  '<';
                                            break;
                                        case '[':
                                            ketQua =  '=';
                                            break;
                                        case ']':
                                            ketQua =  '=';
                                            break;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    return ketQua;
}

// TÌM HỢP CỦA 2 TẬP HỢP A VÀ B - DẠNG TẬP CON CỦA R:
function timHop_conR(tapA,tapB){// nhận vào 2 tập A và B là list 4 phần tử
    // đặt tên lại dữ kiện đầu vào
    let dauA1=tapA[0],A1=tapA[1],A2=tapA[2],dauA2=tapA[3],dauB1=tapB[0],B1=tapB[1],B2=tapB[2],dauB2=tapB[3];
    let ketQua = null;

    // Tìm đầu mút 1.
    if (soSanh_2DauMut(dauB1,B1,dauA1,A1) ==='<'){// B1 < A1. lấy B1
        ketQua = [dauB1,B1];
        // TÌm đầu mút 2.
        if (soSanh_2DauMut(dauB2,B2,dauA2,A2)==='>'){// B2 > A2. lấy B2
            ketQua.push(B2);
            ketQua.push(dauB2);
        } else { //ngược lại. Nếu B2 <=A2.
            if (soSanh_2DauMut(dauB2,B2,dauA1,A1)==='>'){// và nếu A1 < B2. lấy A2.
                ketQua.push(A2);
                ketQua.push(dauA2);
            } else { // nếu B2 <= A1. lấy B2 và nối tiếp A1, A2.
                ketQua = [dauB1,B1,B2,dauB2,'\\cup',dauA1,A1,A2,dauA2];
            }
        }
    } else {// Nếu B1 >= A1
        if (soSanh_2DauMut(dauB1,B1,dauA2,A2)==='>'){ // Nếu B1 > A2. để nguyên đầu vào, thêm dấu \\cup.
            ketQua = [dauA1,A1,A2,dauA2,'\\cup',dauB1,B1,B2,dauB2];
        } else {// ngược lại tức A1 <= B1 <= A2. thì giữa A1. tiếp tục tìm dầu còn lại.
            ketQua = [dauA1,A1];
            // Tìm đầu mút 2.
            if (soSanh_2DauMut(dauB2,B2,dauA2,A2)==='<'){// Nếu B2 < A2. thì giữ A2.
                ketQua.push(A2);
                ketQua.push(dauA2);
            } else { // ngược lại giữ B2.
                ketQua.push(B2);
                ketQua.push(dauB2);
            }
        }
    }
    // lọc lại kết quả, nếu gặp trường hợp như (, 7, ), 9, \\cup, [, 9, 12, ]. thì gom lại thành (, 7, 12, ].
    if(ketQua.length!=9){// độ dài là 4 khi đó kiểm tra có phải toàn bộ tập R hay không
    } else {// nếu gặp kiểu này thì bỏ nối cho gọn.
        if (ketQua[3]===ketQua[6]){
            if (ketQua[2]+ketQua[5] === ')[' ||  ketQua[2]+ketQua[5] === ']('){
                ketQua.splice(2,5);
            }
        }
    }
    // trả kết quả:
    return ketQua;
}
// HẾT HÀM TÌM HỢP

// TÌM GIAO CỦA 2 TẬP HỢP
function timGiao_conR(tapA,tapB){
    let dauA1=tapA[0],A1=tapA[1],A2=tapA[2],dauA2=tapA[3],dauB1=tapB[0],B1=tapB[1],B2=tapB[2],dauB2=tapB[3];
    let ketQua = [];

    // tìm đầu mút 1:
    if (soSanh_2DauMut(dauA1,A1,dauB1,B1)==='<'){// so sánh 2 mút đầu, lớn hơn thì lấy.
        ketQua = [dauB1,B1];
    } else {
        ketQua = [dauA1,A1];
    }
    // tìm đầu mút 2:
    if (soSanh_2DauMut(dauA2,A2,dauB2,B2)==='<'){// so sánh 2 mút sau, nhỏ hơn thì lấy.
        ketQua.push(A2); ketQua.push(dauA2);
    } else {
        ketQua.push(B2); ketQua.push(dauB2);
    }
    // kết quả là [dau,so,so,dau]
    // kiểm tra tính hợp lệ sau tìm giao:
    const soSanh = soSanh_2DauMut(ketQua[0],ketQua[1],ketQua[3],ketQua[2]);
    if (soSanh==='>'){// đầu 1 mà lớn hơn đầu 2 thì bỏ. ra tập trống
        ketQua = ['\\varnothing'];
    } else {
        if (soSanh==='<'){// đầu 1 nhỏ hơn đầu 2 thì ghi bình thường.
        } else { // nếu 2 đầu bằng nhau thì có nghĩa chỉ 1 phần tử và xảy ra chỉ khi ngoặc là [], còn lại là trống.
            if (ketQua[0]+ketQua[3]!='[]'){
                ketQua = ['\\varnothing'];
            }
        }
    }

    // trả kết quả:
    return ketQua;
}
// HẾT HÀM TÌM GIAO 

// ĐỔI DÁU NGOẶC KHI TÌM HIỆU:
function doiDauNgoac(dau){
    let dauMoi = '';
    switch (dau) {
        case ')':
            dauMoi = '[';
            break;
        case '(':
            dauMoi = ']';
            break;
        case '[':
            dauMoi = ')';
            break;
        case ']':
            dauMoi = '(';
            break;
    }
    return dauMoi;
}

// TÌM HIỆU 2 TẬP HỢP CON R
function timHieu_conR(tapA,tapB){// A hiệu B
     // đặt tên lại dữ kiện đầu vào
    let dauA1=tapA[0],A1=tapA[1],A2=tapA[2],dauA2=tapA[3],dauB1=tapB[0],B1=tapB[1],B2=tapB[2],dauB2=tapB[3];
    let ketQua = '';

    if ( soSanh_2DauMut(dauA1,A1,dauB1,B1) === '<' ) {// 1. Nếu A1 < B1, lấy A1. Tiếp tục:
        ketQua = [dauA1,A1];
        if ( soSanh_2DauMut(dauA2,A2,dauB1,B1) === '<' ){// Nếu A2 < B1. Lấy luôn A2 và hết.
            ketQua.push(A2); ketQua.push(dauA2);
        } else { // Nếu B1 <= A2. lấy B1 và đổi dấu ngoặc:
            ketQua.push(B1); ketQua.push(doiDauNgoac(dauB1));
            // xét tiếp đầu B2
            if ( soSanh_2DauMut(dauB2,B2,dauA2,A2) === '<' ){
                ketQua.push('\\cup');ketQua.push(doiDauNgoac(dauB2));
                ketQua.push(B2);ketQua.push(A2);ketQua.push(dauA2);
            }
        }
    }
    if (soSanh_2DauMut(dauA1,A1,dauB1,B1)==='='){// 2.  khi 2 mút đầu bằng nhau, thì xét 2 mút sau:
        if (soSanh_2DauMut(dauB2,B2,dauA2,A2)==='<'){
            ketQua = [doiDauNgoac(dauB2),B2,A2,dauA2];
        } else {
            ketQua = ['\\varnothing'];
        }
    }
    if (soSanh_2DauMut(dauA1,A1,dauB1,B1)==='>'){//3.  khi B1 < A1. thì xét:
        if (soSanh_2DauMut(dauB2,B2,dauA1,A1)==='>'){ // 3.1. A1 < B2, xét tiếp:
            if (soSanh_2DauMut(dauB2,B2,dauA2,A2)==='<'){// B2 <  A2.
                ketQua = [doiDauNgoac(dauB2),B2,A2,dauA2];
            } else {// B2 >= A2 thì
                ketQua = ['\\varnothing'];
            }
        } else {// 3.2. A1 >= B2 thì ra kết quả.
            ketQua = [dauA1,A1,A2,dauA2];
        }
    }

    // trả kết quả
    return ketQua;
}
// HẾT HÀM TÌM HIỆU

// HÀM GHI KẾT QUẢ DẠNG LATEX CHO TẬP CON CỦA R, 3 DẠNG: 
// \\VARNOTHING, 
// DẠNG (A,B) VỚI ÍT NHẤT 1 SỐ
// DẠNG (-\INFTY, +\INFTY) = R.
function ghiTapConR(tapCon){
    let string = ``;
    if (tapCon.length===4){
        if (tapCon[1]!=tapCon[2]){
            string = `\\left${tapCon[0]} ${tapCon[1]} ; ${tapCon[2]} \\right${tapCon[3]}`;
            if (tapCon[1]==='-\\infty' & tapCon[2]==='+\\infty'){
                string = `\\mathbb{R}`;
            }
        } else {
            if (tapCon[0]+tapCon[3] ==='[]'){
                string = `\\left\\{ ${tapCon[1]} \\right\\}`;
            } else {
                string ='\\varnothing';
            }
        }
    }
    if (tapCon.length === 9) {
        if ( tapCon[1] != tapCon[2] ){
            string = `\\left${tapCon[0]} ${tapCon[1]} ; ${tapCon[2]} \\right${tapCon[3]}`;// đoạn khoảng nửa khoảng thứ nhất
        } else {// tập 1 số duy nhất
            string = `\\left\\{ ${tapCon[1]} \\right\\}`;
        }
        string += `${tapCon[4]}`; // dấu nối, thường là dấu hợp. "\\cup"
        if ( tapCon[6] != tapCon[7] ){
            string += `\\left${tapCon[5]} ${tapCon[6]} ; ${tapCon[7]} \\right${tapCon[8]}`; // đoạn khoảng nửa khoảng thứ hai.
        } else {// tập 1 số duy nhất
            string += `\\{ ${tapCon[6]} \\}`;
        }
        if ( tapCon[1] === tapCon[2] & tapCon[6] === tapCon[7] ){// nếu cả hai là 2 con số duy nhất
            string = `\\left\\{ ${tapCon[1]} ; ${tapCon[6]} \\right\\}`;// gom vô thành tập 2 phần tử.
        }
    }
    if (tapCon.length === 1){
        if (tapCon[0]===`\\varnothing`){
            string = `${tapCon[0]}`;
        }
    }
    // trả kết quả
    return string;
}



// 1. TÌM PHÉP TOÁN GIỮA 2 TẬP CON ĐẶC BIỆT CỦA R.
function timPhepToan_2tapConR(){
    // dấu dầu cuối
    let dauDau = ['(','['];
    let dauCuoi = [')',']'];
    // tạo tập ngẫu nhiên sinh ra tập A:
    let a1 = soNguyen(20); 
    let timTapA = [
        [ '(' , '-\\infty' ],
        [dauDau[Math.round(Math.random())] , a1 ],
        [ '+\\infty' , ')' ],
        [ a1+Math.abs(soNguyen(10)) , dauCuoi[Math.round(Math.random())] ]        
    ];
    // tạo tập ngẫu nhiên sinh ra tập B:
    let b1 = soNguyen(20); 
    let timTapB = [
        [ '(' , '-\\infty' ],
        [dauDau[Math.round(Math.random())] , b1 ],
        [ '+\\infty' , ')' ],
        [ b1+Math.abs(soNguyen(10)) , dauCuoi[Math.round(Math.random())] ]
    ];
    // tạo tập A
    let dauA = timTapA[Math.round(Math.sqrt(Math.random()))]; // tìm mốc đầu, kết quả nghiêng về mốc số thực.
    let cuoiA = timTapA[Math.round(Math.sqrt(Math.random())+2)]; // tìm mốc cuối, kết quả nghiêng về mốc số thực.
    let tapA = [ dauA[0] , dauA[1] , cuoiA[0] , cuoiA[1] ]; // ráp vô
    // tạo tập B
    let dauB = timTapB[Math.round(Math.sqrt(Math.random()))]; // tìm mốc đầu, kết quả nghiêng về mốc số thực.
    let cuoiB = timTapB[Math.round(Math.sqrt(Math.random())+2)]; // tìm mốc cuối, kết quả nghiêng về mốc số thực.
    let tapB = [ dauB[0] , dauB[1] , cuoiB[0] , cuoiB[1] ]; // ráp vô


    // tạo thư viện các phép toán:
    var danhSach = {
        1: `${mathString('A\\cap B')}`,
        2: `${mathString('A\\cup B')}`,
        3: `${mathString('A\\setminus B')}`,
        4: `${mathString('B\\setminus A')}`
    };
    // chọn phép toán:
    let phepToan = Math.floor(Math.random()*4+1);

    // nội dung câu hỏi:
    content.innerHTML = `Tìm ${danhSach[phepToan]}, biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = mathString( `A = ${ghiTapConR(tapA)} \\\\ B = ${ghiTapConR(tapB)} .` );

    // tạo các đáp án:
    // Đáp án 1:
    let dapAn0 = `${mathString(`${ghiTapConR(timGiao_conR(tapA,tapB))}`)}`;

    // Đáp án 2:
    let dapAn1 = `${mathString(`${ghiTapConR(timHop_conR(tapA,tapB))}`)}`;
    // Đáp án 3:
    let dapAn2 = `${mathString(`${ghiTapConR(timHieu_conR(tapA,tapB))}`)}`;
    // Đáp án 4:
    let dapAn3 = `${mathString(`${ghiTapConR(timHieu_conR(tapB,tapA))}`)}`;

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapAn0,dapAn1,dapAn2,dapAn3,phepToan);
}
//HẾT HÀM 1.

// 2. TÌM PHÉP TOÁN GIỮA 2 TẬP CON DẠNG LIỆT KÊ.
function timPhepToan_2tapConLietKe(){
    let danhSachSo = [];
    for (let i=-10; i<10; ++i){
        danhSachSo.push(i);
    }
    let danhSachChu = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'];
    // tạo số lượng:
    let soLuongTapA = Math.abs(soNguyenKhac0(10));
    let soLuongTapB = Math.abs(soNguyenKhac0(10));
    // tạo tập A, B ngẫu nhiên:
    let A = new Set();
    let B = new Set();
    if (Math.random()>0.5){// tạo tập số.
        // tập A, lấy từ danhSachSo ra soLuongTapA
        for (let i=0; i<soLuongTapA; ++i){
            A.add(danhSachSo[Math.abs(soNguyen(19))]);
        }
        // tập B, lấy từ danhSachSo ra soLuongTapB
        for (let i=0; i<soLuongTapB; ++i){
            B.add(danhSachSo[Math.abs(soNguyen(19))]);
        }
    } else {
        // tập A, lấy từ danhSachChu ra soLuongTapA
        for (let i=0; i<soLuongTapA; ++i){
            A.add(danhSachChu[Math.abs(soNguyen(16))]);
        }
        // tập B, lấy từ danhSachChu ra soLuongTapB
        for (let i=0; i<soLuongTapB; ++i){
            B.add(danhSachChu[Math.abs(soNguyen(16))]);
        }   
    }

    // tạo thư viện các phép toán:
    var danhSach = {
        1: `${mathString('A\\cap B')}`,
        2: `${mathString('A\\cup B')}`,
        3: `${mathString('A\\setminus B')}`,
        4: `${mathString('B\\setminus A')}`
    };
    // chọn phép toán:
    let phepToan = Math.floor(Math.random()*4+1);

    // hàm liệt kê nội dung tập hợp ra.
    function ghiSet(tap){
        string = ``;
        tap.forEach(pt => { // lướt qua các phần tử và ghi ra chuỗi có cách nhau bởi ;
            string += `; ${pt}`;            
        });
        string = string.substring(1); // ngắt bỏ dấu ; ở đầu
        if (string===``){
            string = `\\varnothing`; // trống trơn tức là tập rỗng
        } else {
            string = `\\{ `+string + `\\}` // không trống thì thêm ký hiệu tập vô
        }
        return string;
    }

    // nội dung câu hỏi:
    content.innerHTML = `Tìm ${danhSach[phepToan]}, biết:`;
    // Dữ kiện cho trong câu hỏi:
    equation.innerHTML = mathString( `A = ${ghiSet(A)} \\\\ B = ${ghiSet(B)} .` );

    // tạo các đáp án:
    // Đáp án 1:
    let dapAn0 = mathString(` ${ghiSet(A.intersection(B))} `);
    // Đáp án 2:
    let dapAn1 = mathString(` ${ghiSet(A.union(B))} `);
    // Đáp án 3:
    let dapAn2 = mathString(` ${ghiSet(A.difference(B))} `);
    // Đáp án 4:
    let dapAn3 = mathString(` ${ghiSet(B.difference(A))} `);

    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapAn0,dapAn1,dapAn2,dapAn3,phepToan);
}
// HẾT HÀM 2.

// HÀM GHI KẾT QUẢ CHO BÀI TOÁN LIỆT KÊ TẬP { x \in R or Z or N thỏa |x| <=> a}
function ketQua_baiToanLietKe_triTuyetDoi(tapSo,dau,so){// tapSo dạng `R`, `Z`, dau dạng `<`, `\\geq`, so dạng Fraction và > 0.
    let string = ``; // kết quả trả về là chuỗi latex.
    // tập số nguyên
    if (tapSo===`R`){
        let soDoi = new Fraction(-so.tuso,so.mauso);
        switch (dau){
            case `<`:
                string = ghiTapConR([`(`,ghiPhanSo(soDoi),ghiPhanSo(so),`)`]);
                break;
            case `>`:
                string = ghiTapConR([`(`,`-\\infty`,ghiPhanSo(soDoi),`)`,`\\cup`,`(`,ghiPhanSo(so),`+\\infty`,`)`]);
                break;
            case `\\leq`:
                string = ghiTapConR([`[`,ghiPhanSo(soDoi),ghiPhanSo(so),`]`]);
                break;
            case `\\geq`:
                string = ghiTapConR([`(`,`-\\infty`,ghiPhanSo(soDoi),`]`,`\\cup`,`[`,ghiPhanSo(so),`+\\infty`,`)`]);
                break; 
        }
    }
    // tập số nguyên
    if (tapSo ===`Z`){// tập số nguyên
        let soThuc = so.tuso/so.mauso;
        switch (dau){
            case `<`:{// |x| < a
                let lonNhat = Math.floor(soThuc);// số lớn nhất là làm tròn dưới của a
                if (soThuc === lonNhat){// nếu a nguyên thì giảm 1 đơn vị.
                    lonNhat -= 1;
                }
                for (let i=-lonNhat; i<lonNhat+1; ++i){// liệt kê từ -lonNhat tới lonNhat.
                    string += `; ${i} `;
                }
                string = string.substring(1);
                string = `\\{` + string + `\\}`;
                break;
            }
            case `\\leq`:{// |x| <= a
                for (let i=-Math.floor(soThuc);i<Math.floor(soThuc)+1;++i){
                    string += `; ${i} `;
                }
                string = string.substring(1);
                string = `\\{` + string + `\\}`;
                break;
            }
            case `>`:{
                let lonNhat = Math.floor(soThuc)+1;// do dấu > nên liệt kê bắt đầu từ số lớn hơn soThuc.
                string += `\\{ ...`;
                for (let i = -lonNhat-2 ; i < -lonNhat+1; ++i){
                    string += `; ${i}`;
                }
                for (let i = lonNhat ; i < lonNhat+3; ++i){
                    string += `; ${i}`;
                }
                string += `; ... \\}`;
                break;
            }
            case `\\geq`:{
                let lonNhat = Math.floor(soThuc);// do có = nên lấy luôn soThuc nếu nó nguyên, còn không nguyên cộng 1
                if (lonNhat != soThuc){
                    lonNhat += 1;
                }
                string += `\\{ ...`;
                for (let i = -lonNhat-2 ; i < -lonNhat+1; ++i){
                    string += `; ${i}`;
                }
                for (let i = lonNhat ; i < lonNhat+3; ++i){
                    string += `; ${i}`;
                }
                string += `; ... \\}`;
                break;
            }
        }
    }
    // tập số tự nhiên
    if (tapSo===`N`){
        let soThuc = so.tuso/so.mauso;
        switch (dau){
            case `<`:{
                let lonNhat = Math.floor(soThuc); // số tự nhiên lớn nhất < a, mặc định là làm tròn dưới của a, nếu a nguyên thì trừ 1.
                if (soThuc === lonNhat){
                    lonNhat += -1;
                }
                for (let i = 0; i< lonNhat+1; ++i){
                    string += `; ${i}`;
                }
                string = string.substring(1);
                string = `\\{` + string + `\\}`;
                break;
            }
            case '\\leq':{
                for (let i = 0; i< Math.floor(soThuc)+1; ++i){
                    string += `; ${i}`;
                }
                string = string.substring(1);
                string = `\\{` + string + `\\}`;
                break;
            }
            case `>`:{
                for (let i = Math.floor(soThuc)+1; i < Math.floor(soThuc)+4; ++i){
                    string += `; ${i}`;
                }
                string = string.substring(1);
                string = `\\{` + string + `; ...\\}`;
                break;
            }
            case `\\geq`:{
                let nhoNhat = Math.floor(soThuc); // số tự nhiên nhỏ nhất còn >= a, mặc định là làm tròn dưới khi a nguyên,  nếu a không nguyên thì cộng 1.
                if (nhoNhat != soThuc){
                    nhoNhat += 1;
                }
                for (let i = nhoNhat; i < Math.floor(soThuc)+3; ++i){
                    string += `; ${i}`;
                }
                string = string.substring(1);
                string = `\\{` + string + `; ...\\}`;
                break;
            }
        }
    }
    return string;
}

// 3. LIỆT KÊ TẬP CON CHO BỞI ĐIỀU KIỆN { X \IN R or N or Z VÀ THỎA |X| < = > SỐ NÀO ĐÓ. }
function lietKe_triTuyetDoi_soSanhVoiA(){
    // chọn tập số để biểu diễn
    let dsTap = [`R`,`Z`,`N`];
    let tapSo = dsTap[Math.floor(Math.random()*3)];

    // chọn dấu bất đẳng thức
    let dsDau = [`>`,`<`,`\\geq`,`\\leq`];
    let dau = dsDau[Math.floor(Math.random()*4)];

    // chọn đầu mút.
    let soHuuTi = new Fraction(Math.abs(soNguyenKhac0(5)) , Math.abs(soNguyenKhac0(10)));

    // nội dung câu hỏi:
    content.innerHTML = `Tập hợp nào bằng với tập cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    let doiDau = {// để có 2 cách ghi tính chất đặc trưng.
        "<":"\\geq", "\\geq":"<",
        ">":"\\leq", "\\leq":">"
    }
    let string = `\\left\\{x \\in \\mathbb{ ${tapSo} } \\mid |x| ${dau} ${ghiPhanSo(soHuuTi)} \\right\\}`;
    if (Math.random()<0.5){
        string = `\\left\\{x \\in \\mathbb{ ${tapSo} } \\mid  ${ghiPhanSo(soHuuTi)} ${doiDau[dau]} |x| \\right\\}`;
    }
    equation.innerHTML = mathString( `${string}` );

    // tạo các đáp án:
    // Đáp án 1: Đáp án đúng.
    let dapAn0 = mathString(`${ketQua_baiToanLietKe_triTuyetDoi(tapSo,dau,soHuuTi)}`);
  
    // Đáp án 2: Ngược dấu.
    let dapAn1 = mathString(`${ketQua_baiToanLietKe_triTuyetDoi(tapSo,doiDau[dau],soHuuTi)}`);

    // Đáp án 3: Đổi sai tập cha.
    let tapSoSai = {
        'R':'Z', 'N':'R', 'Z':'N'
    }
    let dapAn2 = mathString(`${ketQua_baiToanLietKe_triTuyetDoi(tapSoSai[tapSo],dau,soHuuTi)}`);

    // Đáp án 4:
    let dapAn3 = mathString(`${ketQua_baiToanLietKe_triTuyetDoi(tapSoSai[tapSo],doiDau[dau],soHuuTi)}`);


    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapAn0,dapAn1,dapAn2,dapAn3,1);
}
// HẾT HÀM 3.

// 4. HỎI ĐOẠN, KHOẢNG, NỬA KHOẢNG KHI BIẾT MÔ TẢ.
function xacDinh_TapConR(){

    // tạo tập có 3 dạng (-\infty; số) (số;số) và (số;+\infty):
    // tạo tập tìm mốc đầu
    let Dau = [ `-\\infty` , new Fraction(soNguyen(10),soNguyenKhac0(15)) ];
    // tạo khoảng tăng lên để tìm mốc cuối
    let khoangTang = new Fraction( Math.abs(soNguyenKhac0(10)) , soNguyenKhac0(5) );
    // tạo tập tìm mốc cuối
    let Cuoi = [ congPhanSo( Dau[1] , khoangTang ) , `+\\infty`];
    // chọn mốc đầu và dấu đầu
    let mocDau = Dau[Math.round(Math.random())]; // chọn mốc đầu
    let dauDau = `(`; // dấu đầu mặc định
    if (mocDau !=`-\\infty`){// nếu khác -\infty thì số có 2 dấu 
        if (Math.random()<0.5){
            dauDau = `[`;
        }
    }
    // chọn mốc cuối và dấu cuối
    let mocCuoi = Cuoi[Math.round(Math.random())];// chọn mốc cuối và kiểm tra lại xem có bị ra kết quả là toàn bộ R không.
    if (mocDau === `-\\infty` & mocCuoi === `+\\infty`){// nếu ra R
        mocCuoi = Cuoi[0];// thì chọn mốc cuối là SỐ.
    }
    let dauCuoi = ')'; // dấu cuối mặc định
    if (mocCuoi != `+\\infty`){// nếu khác +\infty thì số có 2 dấu
        if (Math.random()<0.5){
            dauCuoi = `]`;
        }
    }

    // nội dung câu hỏi:
    content.innerHTML = `Tập hợp nào bằng với tập cho dưới đây:`;
    // Dữ kiện cho trong câu hỏi:
    let string = `\\left\\{ x \\in R \\mid `; // đầu tập luôn là x thuộc R
    let dauBatDangThuc = { "(":"<", "[":"\\leq", ")":"<", "]":"\\leq"}; // đổi dấu ()[] sang <,\\leq.
    // ghi mốc đầu:
    if (mocDau !=`-\\infty`){// mốc đầu là số thì:
        string += `${ghiPhanSo(mocDau)} ${dauBatDangThuc[dauDau]}`; // ghi ra mốc đầu và dấu bất đẳng thức tương ứng.
    }// ngược lại -\infty khỏi ghi
    string += `  x  `; // ghi x vô.
    // ghi mốc sau:
    if (mocCuoi !=`+\\infty`){// mốc cuối là số thì:
        string += `${dauBatDangThuc[dauCuoi]} ${ghiPhanSo(mocCuoi)} `; // ghi ra dấu bất đẳng thức tương ứng và mốc cuối.
    }// ngược lại khỏi ghi
    // xong rồi kết tập:
    string += `\\right\\}`;
    // ghi dữ kiện câu hỏi ra:
    equation.innerHTML = mathString( `${string}` );

    // tạo các đáp án:
    if (mocDau != `-\\infty`){
        mocDau = `${ghiPhanSo(mocDau)}`;
    }
    if (mocCuoi != `+\\infty`){
        mocCuoi = `${ghiPhanSo(mocCuoi)}`;
    }
    // Đáp án 1: Đáp án đúng.
    let dapAn0 = mathString(`${ghiTapConR([dauDau,mocDau,mocCuoi,dauCuoi])}`);

    // làm dấu sai:
    let saiDau = {"(":"[", ")":"]", "[":"(", "]":")"};
    // Đáp án 2: Sai dấu bên trái
    let dapAn1 = mathString(`${ghiTapConR([saiDau[dauDau],mocDau,mocCuoi,dauCuoi])}`);

    // Đáp án 3: Sai dấu bên phải.
    let dapAn2 = mathString(`${ghiTapConR([dauDau,mocDau,mocCuoi,saiDau[dauCuoi]])}`);

    // Đáp án 4: Sai dấu 2 bên.
    let dapAn3 = mathString(`${ghiTapConR([saiDau[dauDau],mocDau,mocCuoi,saiDau[dauCuoi]])}`);


    // hiện các đáp án và hiệu ứng chọn.
    hienTracNghiem4LuaChon(dapAn0,dapAn1,dapAn2,dapAn3,1);
}
// HẾT HÀM 4.

let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");

restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*4)+1) { // Tự động chọn dạng câu hỏi: DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            timPhepToan_2tapConR();
            break;
        case 2:
            timPhepToan_2tapConLietKe();
            break;
        case 3:
            lietKe_triTuyetDoi_soSanhVoiA();
            break;
        case 4:
            xacDinh_TapConR();
            break;
    }
});