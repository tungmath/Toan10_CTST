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
            let nghiem = soNguyenDuong(40)+70; //chọn đại giá trị c/a hay c/b là số dương đại diện.
            if (-c/(a+b)<0){// nếu < 0 thì đổi dấu.
                nghiem = -nghiem;
            }
            // ghi kết quả ra:
            if (a != 0){// đường x=nghiem
                return [nghiem,-200, nghiem, 200,-a*nghiem];// kèm C lớn scale
            } else {// đường y=nghiem
                return [-200, nghiem, 200, nghiem,-b*nghiem];// kèm C lớn scale
            }
        } else {// 3. cả a, b, c khác 0. vẽ cắt cả 2 trục.
            let M = Math.max(Math.abs(c/b),Math.abs(c/a));// tìm max của 2 điểm cắt.
            let R = soNguyenDuong(20)+140;// tạo số ngẫu nhiên trong khoảng [140;160]
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
    let B = -b;
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


// hàm lấy kích thước của khung chữ nhật bao ngoài một mã svg nào đó
function layKichThuoc(text){
let svgString=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" >
    <defs>
        <g id="kichThuoc">
            ${text}
        </g>
    </defs>
    <use id="tam" href="#kichThuoc" x="0" y="0"/>
</svg>`;

let parser = new DOMParser();
let svgDoc = parser.parseFromString(svgString,`image/svg+xml`);

let svgEle = svgDoc.documentElement;

let temp = document.getElementById('temp');
temp.appendChild(svgEle);

let svgImg = svgEle.getElementById('tam');// lấy thẻ use ra đo kích thước

let box = svgImg.getBBox();
svgEle.remove();

return box;
}

// hàm vẽ số nguyên ra chuỗi svg. kết quả là các thẻ svg mô tả nó.
function veSoNguyenSVG(so){
    let stringSVG = `<text font-size="16" x="0" y="0"> ${so} </text>`;
    return stringSVG;
}

// hàm vẽ phân số ra chuỗi svg, kết quả là các thẻ svg mô tả nó.
function vePhanSoSVG(phanSo){
    let tuSoSVG = `<text font-size="16" x="0" y="0"> ${Math.abs(phanSo.tuso)} </text>`;// vẽ cái tử số dương ra trước để đo kích thước
    let kichThuocTuSo = layKichThuoc(tuSoSVG);// lấy kích thước tử số để vẽ tiếp.
    let mauSoSVG = `<text font-size="16" x="0" y="0"> ${phanSo.mauso} </text>`;// cái mẫu số ra luôn
    let kichThuocMauSo = layKichThuoc(mauSoSVG);// lấy kích thước mẫu số.
    // vẽ ra phân số thôi.
    // tử số thì bình thường:
    let stringSVG = `<text font-size="16" x="0" y="0"> ${Math.abs(phanSo.tuso)} </text>`;
    // xác định mẫu số nằm ở dưới và canh chính giữa với tử số, nên tính toán tọa độ theo kích thước tử mẫu, chừa thêm chỗ vẽ gạch phân số
    stringSVG +=`<text font-size="16" x="${(kichThuocTuSo.width-kichThuocMauSo.width)/2}" y="${ - kichThuocMauSo.y}"> ${phanSo.mauso} </text>`;
    // giờ vẽ thêm cái gạch nữa là xong: nó dài hơn cả tử mẫu:
    stringSVG += `<line x1="${-Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2}" y1="2"`;// điểm đầu
    stringSVG += ` x2="${Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2-4}" y2="2" stroke="black" />`;// đểm cuối
    if (phanSo.tuso < 0){
        stringSVG += `<text font-size="16" x="${-Math.max(kichThuocTuSo.width,kichThuocMauSo.width)/2+kichThuocTuSo.width/2-8}" y="5.5"> - </text>`;
    }
    
    return stringSVG;
}

// hàm vẽ tọa độ ra chuỗi SVG
function veGiaoSVG(phanSo){
    if (phanSo.mauso===1){
        return veSoNguyenSVG(phanSo.tuso);
    } else {
        return vePhanSoSVG(phanSo);
    }
}

// hàm vẽ tọa độ. Ra chính xác vị trí và giá trị của hoành độ, tung độ.
// có nhiều giao điểm nên thêm 1 biến đếm số giao để tránh trùng.
let soLuongGiaoDiem = 0;
function veToaDoCacDiemGiao(a,b,c,list,dau){

    let veToaDoSVG = ``;// kết quả trả ra toàn bộ code vẽ tọa độ đúng giao điểm.
    let C=list[4];// hệ số C lớn đã scale

    if (a ===0 & c != 0){// b khác 0, c khác 0, vẽ 1 điểm y = -c/b

        let giao = new Fraction(-c,b);// tọa độ giao điểm với Oy
        let boxGiaoSVG = `<defs> 
        <g id="giaoDiem${soLuongGiaoDiem}">
        ${veGiaoSVG(giao)}
        </g>
        </defs>`; // chuỗi svg để vẽ ra tung độ giao điểm.
        veToaDoSVG += boxGiaoSVG;

        // sau khi có group để vẽ phân số thì tìm tọa độ để đặt nó vô:
        let kichThuoc = layKichThuoc(veGiaoSVG(giao));//lấy kích thước của box vẽ tọa độ giao điểm
    

        if (dau==='<' || dau==='\\leq'){// hướng lấy nghiệm là (0,-b) khi đó:
            // hướng lên:
            if (-b>0){// đặt box tọa độ lên cao
                let toaDo = doiSVG([10,-C/b+kichThuoc.height-10]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên trên.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            // hướng xuống:
            } else {// box tọa độ ngay mốc
                let toaDo = doiSVG([10,-C/b-kichThuoc.height+5]);// dùng C lớn để xác định điểm vẽ. Ngay tại điểm mốc.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            }
        } else {// hướng lấy nghiệm là (0,b) khi đó, giống như trên nhưng thay điều kiện là b > < 0
            // hướng lên:
            if (b>0){// đặt box tọa độ lên cao
                let toaDo = doiSVG([10,-C/b + kichThuoc.height-10]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên tên.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            // hướng xuống:
            } else {// box tọa độ ngay mốc
                let toaDo = doiSVG([1,-C/b - kichThuoc.height+5]);// dùng C lớn để xác định điểm vẽ. Ngay tại điểm mốc.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            }
        }
        soLuongGiaoDiem ++;
    }

    if (b===0 & c != 0){// a khác 0, c khác 0, vẽ 1 điểm x = -c/a. vẽ như trên nhưng thay b bằng a và trái/phải.

        let giao = new Fraction(-c,a);// tọa độ giao điểm với Oy
        let boxGiaoSVG = `<defs> 
        <g id="giaoDiem${soLuongGiaoDiem}">
        ${veGiaoSVG(giao)}
        </g>
        </defs>`; // chuỗi svg để vẽ ra tung độ giao điểm.
        veToaDoSVG += boxGiaoSVG;

        // sau khi có group để vẽ phân số thì tìm tọa độ để đặt nó vô:
        let kichThuoc = layKichThuoc(veGiaoSVG(giao));//lấy kích thước của tọa độ giao điểm (KHÔNG PHẢI CÁI BOX)

        if (dau==='<' || dau==='\\leq'){// hướng lấy nghiệm là (-a,0) khi đó:
            // hướng trái
            if (-a<0){// đặt box tọa độ qua trái
                let toaDo = doiSVG([-C/a-kichThuoc.width,-kichThuoc.height]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ qua trái.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            // hướng phải
            } else {// box tọa độ ngay mốc
                let toaDo = doiSVG([-C/a+10,-kichThuoc.height]);// dùng C lớn để xác định điểm vẽ. Ngay tại điểm mốc.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            }
        } else {// hướng lấy nghiệm là (a,0) khi đó, giống như trên nhưng thay điều kiện là a > < 0
            // hướng trái:
            if (a<0){// đặt box tọa độ qua trái
                let toaDo = doiSVG([-C/a-kichThuoc.width,-kichThuoc.height]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ qua trái.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            // hướng phải
            } else {// box tọa độ ngay mốc
                let toaDo = doiSVG([-C/a+10,-kichThuoc.height]);// dùng C lớn để xác định điểm vẽ. Ngay tại điểm mốc.
                veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
            }
        }
        soLuongGiaoDiem++;
    }

    if (a != 0 & b!= 0 & c != 0){// vẽ 2 điểm (0,-c/b) và (-c/a,0)

        let giaoOx = new Fraction(-c,a); // hoành độ giao điểm Ox
        let giaoOy = new Fraction(-c,b); // tung độ giao điểm với Oy

        // chuỗi svg để định nghĩa nhóm vẽ ra hoành độ giao điểm.
        let boxGiaoSVG_Ox = `<defs> 
        <g id="giaoDiem${soLuongGiaoDiem}-Ox">
        ${veGiaoSVG(giaoOx)}
        </g>
        </defs>`; 
        // chuỗi svg để định nghĩa nhóm vẽ ra tung độ giao điểm.
        let boxGiaoSVG_Oy = `<defs> 
        <g id="giaoDiem${soLuongGiaoDiem}-Oy">
        ${veGiaoSVG(giaoOy)}
        </g>
        </defs>`; 
        // nối vô 
        veToaDoSVG += boxGiaoSVG_Ox + boxGiaoSVG_Oy;

        // sau khi có group để vẽ phân số thì tìm tọa độ để đặt nó vô:
        let kichThuoc_giaoOx = layKichThuoc(veGiaoSVG(giaoOx));// lấy kích thước của hoành độ giao điểm với Ox (KHÔNG PHẢI CÁI BOX)
        let kichThuoc_giaoOy = layKichThuoc(veGiaoSVG(giaoOy));// lấy kích thước của hoành độ giao điểm với Ox (KHÔNG PHẢI CÁI BOX)


        // tìm vecto chỉ hướng vẽ nghiệm:
        let vectoHuong = [a,b];// hướng mặc định là vecto a,b
        if ( (dau===`<` || dau===`\\leq`) ){// nếu dấu < \\leq thì đổi chiều
            vectoHuong = [-a,-b];
        }

        // tìm hướng vẽ:
        let huong = ``;
        if (vectoHuong[1] > 0){
            huong +='tren-';
        } else {
            huong += 'duoi-';
        }
        if (vectoHuong[0] > 0){
            huong += 'phai';
        } else {
            huong +='trai';
        }

        // có hướng rồi thì vẽ:
        switch (huong){
            case 'tren-phai':
                {
                    // vẽ giao Ox trước:
                    let toaDo = doiSVG([-C/a+10,kichThuoc_giaoOx.height-5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên trên.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Ox" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                     // vẽ giao Oy trước:
                    toaDo = doiSVG([0+10,-C/b+ kichThuoc_giaoOx.height-5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên trên.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Oy" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                    break;
                }
            case 'duoi-phai':
                {
                    // vẽ giao Ox trước:
                    let toaDo = doiSVG([-C/a + 5,0-kichThuoc_giaoOx.height+5]);// dùng C lớn để xác định điểm vẽ. mốc giữ nguyên.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Ox" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                     // vẽ giao Oy trước:
                    toaDo = doiSVG([0 + 5,-C/b-kichThuoc_giaoOy.height+5]);// dùng C lớn để xác định điểm vẽ. mốc giữ nguyên.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Oy" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                    break;
                }
            case 'tren-trai':
                {
                    // vẽ giao Ox trước:
                    let toaDo = doiSVG([-C/a-kichThuoc_giaoOx.width , kichThuoc_giaoOx.height-5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên trên và qua trái.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Ox" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                     // vẽ giao Oy trước:
                    toaDo = doiSVG([ - kichThuoc_giaoOy.width, -C/b+kichThuoc_giaoOy.height-5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ lên trên và qua trái.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Oy" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                    break;
                }
            case 'duoi-trai':
                {
                    // vẽ giao Ox trước:
                    let toaDo = doiSVG([-C/a - kichThuoc_giaoOx.width-5,0-kichThuoc_giaoOx.height+5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ qua trái.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Ox" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                     // vẽ giao Oy trước:
                    toaDo = doiSVG([-kichThuoc_giaoOy.width-5,-C/b-kichThuoc_giaoOy.height+5]);// dùng C lớn để xác định điểm vẽ. và dịch mốc vẽ qua trái.
                    veToaDoSVG += `<use href="#giaoDiem${soLuongGiaoDiem}-Oy" x="${toaDo[0]}" y="${toaDo[1]}" />`;// vẽ giá trị tọa độ tại điểm xác định
                    break;
                }
        }
        soLuongGiaoDiem++;
    }

    return veToaDoSVG;
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
    ${veToaDoCacDiemGiao(a,b,c,diem,dau)}
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
    let doiDau = {'<':'\\geq', '>':'\\leq', '\\leq':'>', '\\geq':'<'};
    // Đáp án 1: đúng
    let dapAn0 = `${veMienNghiemBPT(a,b,c,dau)}`;
    // Đáp án 2: sai điểm cắt
    let dapAn1 = `${veMienNghiemBPT(a,b,-c,dau)}`;
   
    // Đáp án 3: sai trục luôn
    let dapAn2 = `${veMienNghiemBPT(-a,b,c,dau)}`;
    // Đáp án 4: tô sai miền
    
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