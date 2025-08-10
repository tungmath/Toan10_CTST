// Lớp 10. Chương 2. Bài 1: Bất phương trình bậc nhất hai ẩn.

//  1. NHẬN BIẾT BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  2. TÌM NGHIỆM CỦA BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  3. TÌM MIỀN NGHIỆM CỦA BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.
//  4. CHO MIỀN NGHIỆM, TÌM LẠI BẤT PHƯƠNG TRÌNH BẬC NHẤT 2 ẨN.


// để vẽ hình, tôi chọn vẽ bằng định dạng svg.

// khích thức khung hình:
let rongSVG = caoSVG = 400;

// hàm đổi tọa độ từ Đề-các sang tọa độ trong SVG với gốc nằm chính giữa khung hình.
function doi_SVG(x,y){
    let xSVG = x + rongSVG/2;
    let ySVG = -y + caoSVG/2;
    return { x:xSVG , y:ySVG };
}

let dapAn1 = `<svg width="${rongSVG}" height="${caoSVG}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid black">
    <line x1="0" y1="200" x2="400" y2="200" stroke="black" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="black" />
    </svg>`;
let dapAn2 = `<svg width="${rongSVG}" height="${caoSVG}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid black">
    <line x1="0" y1="200" x2="400" y2="200" stroke="black" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="black" />
    </svg>`;
let dapAn3 = `<svg width="${rongSVG}" height="${caoSVG}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid black">
    <line x1="0" y1="200" x2="400" y2="200" stroke="black" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="black" />
    </svg>`;
let dapAn4 = `<svg width="${rongSVG}" height="${caoSVG}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid black">
    <line x1="0" y1="200" x2="400" y2="200" stroke="black" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="black" />
    </svg>`;

let choicesElement = document.querySelector(".choices");

hienTracNghiem4LuaChon(dapAn4,dapAn1,dapAn2,dapAn3,1);




