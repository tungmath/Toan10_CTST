// Dạng phương trình: căn tam thức = căn tam thức và căn tam thức = nhị thức.
// Các dạng trắc nghiệm, đúng sai, trả lời ngắn:
// 1. Hỏi nghiệm, 
// 2. tổng nghiệm,
// 3. số nghiệm,
// 4. tích nghiệm,
// 5. tổng bình phương các nghiệm.






function square_cd(a,b,c){ // tìm ước chung bình phương của 3 số.
    let num=gcd(a,gcd(b,c));
    let scd=1;
    for (let i=2 ; i < Math.floor(Math.sqrt(num)) ; i++){
        if (num%(i*i)===0){
            scd=i*i;
        }
    }
    return scd;
}

// Tạo các phương trình khi biến đổi thì ra 2 nghiệm hữu tỉ "khác nhau" (chưa biết nhận hay không).
function taoPhuongTrinh_CanBangCan() {
    let nice=0;
    let a=0, b=0, c=0, d=0, e=0, f=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);
    let zeroindex=0;
    //let songhiem=Math.round(Math.random()*2);// số nghiệm cần có 0-2.
    while (nice!=1) {
        a=(Math.round(Math.random()*10)+1)*randomSign();
        b=(Math.round(Math.random()*40))*randomSign();
        c=(Math.round(Math.random()*80))*randomSign();
        d=(Math.floor(Math.random()*10))*randomSign();
        e=(Math.round(Math.random()*40))*randomSign();
        f=(Math.round(Math.random()*80))*randomSign();
        let A=a-d;
        let B=b-e;
        let C=c-f;
        if (A!=0) {
            let Delta=B*B-4*A*C;
            if (Delta>0){
                Delta = Math.sqrt(Delta);
                if (Delta === Math.floor(Delta)) {
                    let x_1 = (-B + Delta)/(2*A);
                    let x_2 = (-B - Delta)/(2*A);
                    if (a*x_1*x_1+b*x_1+c >= 0 && d*x_1*x_1+e*x_1+f >=0) {
                        zeroindex+=1;
                        //nice+=1;
                    }
                    if (a*x_2*x_2+b*x_2+c >= 0 && d*x_2*x_2+e*x_2+f >=0) {
                        zeroindex+=2;
                        //nice+=1;
                    }
                    x1 = new Fraction( -B + Delta , 2*A );
                    x2 = new Fraction( -B - Delta , 2*A );
                    nice =1; /// đã tìm thấy phương trình.
                }                
            }
        }
    }
    console.log(zeroindex);
    return [a,b,c,d,e,f,x1,x2,zeroindex];
};

function taoPhuongTrinh_CanBangNhiThuc() {// Tạo các phương trình khi biến đổi thì ra 2 nghiệm hữu tỉ khác nhau (chưa biết nhận hay không).
    let nice=0;
    let a=0, b=0, c=0, d=0, e=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);
    let zeroindex=0;
    while (nice!=1) {
        a=(Math.round(Math.random()*10)+1)*randomSign();
        b=(Math.round(Math.random()*40)+1)*randomSign();
        c=(Math.round(Math.random()*80)+1)*randomSign();
        d=(Math.round(Math.random()*10)+1)*randomSign();
        e=(Math.round(Math.random()*40)+1)*randomSign();
        let A=a-d*d;
        let B=b-2*d*e;
        let C=c-e*e;
        if (A!=0) {
            let Delta=B*B-4*A*C;
            if (Delta>0){ // có 2 nghiệm.
                Delta = Math.sqrt(Delta);
                if (Delta === Math.floor(Delta)) {
                    let x_1 = (-B + Delta)/(2*A);
                    let x_2 = (-B - Delta)/(2*A);
                    if (a*x_1*x_1+b*x_1+c >= 0 && d*x_1+e >=0) {
                        zeroindex+=1;
                    }
                    if (a*x_2*x_2+b*x_2+c >= 0 && d*x_2+e>=0) {
                        zeroindex+=2;
                    }
                    x1 = new Fraction( -B + Delta , 2*A );
                    x2 = new Fraction( -B - Delta , 2*A );
                    nice=1;//đã lấy được bộ số cho phương trình.        
                }
            }
        }
    }
    return [a,b,c,d,e,x1,x2,zeroindex];
};

function taoPhuongTrinh(){// Tạo các phương trình dạng có căn theo sgk toán 10 hk 2 chương trình 2018, khi biến đổi thì ra 2 nghiệm hữu tỉ khác nhau (chưa biết nhận hay không).
    if (Math.round(Math.random())===0){
        return taoPhuongTrinh_CanBangCan();
    }else{
        return taoPhuongTrinh_CanBangNhiThuc();
    }
}

function ghiPhuongTrinh(eq){// trả về chuỗi phương trình dạng MathML dùng KaTeX
    let a=b=c=d=e=f=1;
    let mathstring=``;
    if (eq.length===8){ // phương trình dạng căn bằng nhị thức.
        a=eq[0], b=eq[1], c=eq[2], d=eq[3], e=eq[4];
        let scd=square_cd(a,b,c);
        gcdde=gcd(d,e);
        if (scd>1){
            mathstring = katex.renderToString(`${Math.sqrt(scd)}\\sqrt{${trinomial(a/scd,b/scd,c/scd)}}=${binomial(d,e)}`, {
                throwOnError: false // Optional: prevent errors from halting script execution
            });
        }else{
            if (gcdde>1){
                if (d<0 && e<0){ gcdde=-gcdde;}
                mathstring = katex.renderToString(`\\sqrt{${trinomial(a,b,c)}}=${gcdde}(${binomial(d/gcdde,e/gcdde)})`, {
                    throwOnError: false // Optional: prevent errors from halting script execution
                });
            }else{
                mathstring = katex.renderToString(`\\sqrt{${trinomial(a,b,c)}}=${binomial(d,e)}`, {
                    throwOnError: false // Optional: prevent errors from halting script execution
                });
            }
        }
    }else{
        if (eq.length===9){ // phương trình dạng căn bằng căn.
            a=eq[0], b=eq[1], c=eq[2], d=eq[3], e=eq[4], f=eq[5];
            let scd=square_cd(a,b,c);
            if (scd>1){
                mathstring = katex.renderToString(`${Math.sqrt(scd)}\\sqrt{${trinomial(a/scd,b/scd,c/scd)}}=\\sqrt{${trinomial(d,e,f)}}`, {
                    throwOnError: false // Optional: prevent errors from halting script execution
                });
            }else{
                mathstring = katex.renderToString(`\\sqrt{${trinomial(a,b,c)}}=\\sqrt{${trinomial(d,e,f)}}`, {
                    throwOnError: false // Optional: prevent errors from halting script execution
                });
            }
        }
    }
    return mathstring;
}


// CÁC DẠNG CÂU HỎI

// 1. TRẮC NGHIỆM HỎI NGHIỆM:

function taoTracNghiem_HoiNghiem(){// câu hỏi trắc nghiệm dạng hỏi nghiệm phương trình.

    let eq=taoPhuongTrinh();// tạo phương trình tùy ý ra 2 nghiệm hữu tỉ (chưa nhận loại).

    let x_1=``, x_2=``, zeroindex=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);
    if (eq.length===8){
        x1=eq[5], x2=eq[6], zeroindex=eq[7];
    }else{
        if (eq.length===9){
            x1=eq[6], x2=eq[7], zeroindex=eq[8];
        }
    }

    content.innerHTML = 'Tìm <b>tất cả</b> các nghiệm của phương trình dưới đây?';
    equation.innerHTML = ghiPhuongTrinh(eq); 

    choices = [];

    choices.push("Vô nghiệm");

    if (x1.mauso===1){
        x_1=`${x1.tuso}`;
    }else{
        x_1=`\\dfrac{${x1.tuso}}{${x1.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_1}`));

    if (x2.mauso===1){
       x_2=`${x2.tuso}`;
    }else{
        x_2=`\\dfrac{${x2.tuso}}{${x2.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_2}`));

    choices.push(katex.renderToString(`${x_1}`)+`  và  `+katex.renderToString(`${x_2}`));

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.


    choicesElement.innerHTML = '';
    let i=0;
    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }

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
    let cauDung = map.indexOf(zeroindex);// chỉ số đáp án đúng

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}


// 2. TRẮC NGHIỆM HỎI TỔNG:

function taoTracNghiem_HoiTong(){// câu hỏi trắc nghiệm dạng hỏi Tổng các nghiệm phương trình.

    let eq = [];
    let x_1=``, x_2=``, sumindex=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);

    //tìm phương trình có 2 nghiệm khác nhau, khác 0 và nhận ít nhất 1 nghiệm.
    let nice=0;
    while (nice!=1){
        eq =taoPhuongTrinh();
        // lấy nghiệm và số nghiệm thỏa.
        if (eq.length===8){
            x1=eq[5], x2=eq[6], sumindex=eq[7];
        }else{
            if (eq.length===9){
                x1=eq[6], x2=eq[7], sumindex=eq[8];
            }
        }
        if (x1.tuso*x2.tuso!=0 && sumindex>0){
        // phương trình thỏa yêu cầu tạo đề khi ra 2 nghiệm khác nhau, khác 0 và nhận ít nhất 1 nghiệm.
            nice=1; // tìm thấy pt thỏa.
        }
    }
    
    content.innerHTML = '<b>Tổng</b> các nghiệm của phương trình dưới đây bằng bao nhiêu?';
    // ghi phương trình.
    equation.innerHTML = ghiPhuongTrinh(eq); 

    choices = [];

    choices.push("Không có");

    if (x1.mauso===1){
        x_1=`${x1.tuso}`;
    }else{
        x_1=`\\dfrac{${x1.tuso}}{${x1.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_1}`));

    if (x2.mauso===1){
       x_2=`${x2.tuso}`;
    }else{
        x_2=`\\dfrac{${x2.tuso}}{${x2.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_2}`));

    let sum = new Fraction( x1.tuso*x2.mauso + x2.tuso*x1.mauso , x1.mauso*x2.mauso );
    if (sum.mauso===1){
        sum=`${sum.tuso}`;
     }else{
         sum=`\\dfrac{${sum.tuso}}{${sum.mauso}}`;
     };
    choices.push(katex.renderToString(`${sum}`));

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.


    choicesElement.innerHTML = '';
    let i=0;
    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }

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
    let cauDung = map.indexOf(sumindex);// chỉ số đáp án đúng

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}

// 3. TRẮC NGHIỆM HỎI SỐ NGHIỆM

function taoTracNghiem_SoNghiem(){// câu hỏi trắc nghiệm dạng hỏi SỐ nghiệm phương trình.

    let eq=taoPhuongTrinh();// tạo phương trình tùy ý ra 2 nghiệm hữu tỉ (chưa nhận loại).

    let zeroindex=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);
    if (eq.length===8){
        x1=eq[5], x2=eq[6], zeroindex=eq[7];
    }else{
        if (eq.length===9){
            x1=eq[6], x2=eq[7], zeroindex=eq[8];
        }
    }

    content.innerHTML = 'Phương trình sau có tất cả <b>bao nhiêu nghiệm</b>?';
    equation.innerHTML = ghiPhuongTrinh(eq); 

    choices = [];
    choices.push(katex.renderToString(`${0}`));
    choices.push(katex.renderToString(`${1}`));
    choices.push(katex.renderToString(`${2}`));
    choices.push(katex.renderToString(`${3}`));

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.

    choicesElement.innerHTML = '';
    let i=0;
    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }

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

    // hiện đáp án đúng.
    let zeronum=0;
    if (zeroindex===1 || zeroindex===2){ // chỉ số nghiệm là 1, 2 thì có 1 nghiệm.
        zeronum=1;
    }else{
        if (zeroindex===3){ // chỉ số nghiệm là 3 thì có 2 nghiệm.
            zeronum=2;
        }
    }

    // gán câu đúng.
    let cauDung = map.indexOf(zeronum);// chỉ số đáp án đúng

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}


// 4. TRẮC NGHIỆM HỎI TÍCH CÁC NGHIỆM

function taoTracNghiem_HoiTich(){// câu hỏi trắc nghiệm dạng hỏi Tích các nghiệm phương trình.

    let eq = [];
    let zeroindex=0;
    let x1= new Fraction(1,1), x2 = new Fraction(1,1);

    //tìm phương trình có 2 nghiệm khác nhau, đều khác 0 và 1 (ĐỀU NHẬN).
    let nice=0;
    while (nice!=1){
        eq =taoPhuongTrinh();
        // lấy nghiệm và số nghiệm thỏa.
        if (eq.length===8){
            x1=eq[5], x2=eq[6], zeroindex=eq[7];
        }else{
            if (eq.length===9){
                x1=eq[6], x2=eq[7], zeroindex=eq[8];
            }
        }
        
        if (zeroindex===3){ // nhận cả hai nghiệm.
            if ( x1.tuso!=0 && x1.tuso/x1.mauso!=1 && x2.tuso!=0 && x2.tuso/x2.mauso!=1){
            // phương trình thỏa yêu cầu tạo đề khi ra 2 nghiệm khác nhau và đều khác 0 và 1.
                nice=1; // tìm thấy pt thỏa.
            }
        }
    }
    
    content.innerHTML = '<b>Tích</b> các nghiệm của phương trình dưới đây bằng bao nhiêu?';
    // ghi phương trình.
    equation.innerHTML = ghiPhuongTrinh(eq); 

    choices = [];

    let x_1=``, x_2=``;

    if (x1.mauso===1){
        x_1=`${x1.tuso}`;
    }else{
        x_1=`\\dfrac{${x1.tuso}}{${x1.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_1}`));

    if (x2.mauso===1){
       x_2=`${x2.tuso}`;
    }else{
        x_2=`\\dfrac{${x2.tuso}}{${x2.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_2}`));

    let sum = new Fraction( x1.tuso*x2.mauso + x2.tuso*x1.mauso , x1.mauso*x2.mauso );
    if (sum.mauso===1){
        sum=`${sum.tuso}`;
     }else{
         sum=`\\dfrac{${sum.tuso}}{${sum.mauso}}`;
     };
    choices.push(katex.renderToString(`${sum}`));

    let prod = new Fraction( x1.tuso*x2.tuso, x1.mauso*x2.mauso );
    if (prod.mauso===1){
        prod=`${prod.tuso}`;
     }else{
        prod =`\\dfrac{${prod.tuso}}{${prod.mauso}}`;
     };
    choices.push(katex.renderToString(`${prod}`));

    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.


    choicesElement.innerHTML = '';
    let i=0;
    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }

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
    let cauDung = map.indexOf(3);// chỉ số đáp án đúng. chỉ số câu 3 trong map.

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}

// 5. TRẮC NGHIỆM HỎI TỔNG BÌNH PHƯƠNG CÁC NGHIỆM

function taoTracNghiem_HoiTongBinhPhuong(){// câu hỏi trắc nghiệm dạng hỏi Tổng bình phương các nghiệm phương trình.

    let eq = [];
    let zeroindex=0;

    //tìm phương trình có 2 nghiệm khác nhau, đều nhận.
    let nice=0;
    while (nice!=1){
        eq =taoPhuongTrinh();
        // lấy nghiệm và số nghiệm thỏa.
        if (eq.length===8){
            x1=eq[5], x2=eq[6], zeroindex=eq[7];
        }else{
            if (eq.length===9){
                x1=eq[6], x2=eq[7], zeroindex=eq[8];
            }
        }
        if (zeroindex===3){ // nhận cả hai nghiệm.
            if ( x1.tuso/x1.mauso!=0 && x2.tuso/x2.mauso!=0){
            // phương trình thỏa yêu cầu tạo đề khi ra 2 nghiệm khác nhau và đều khác 0.
                nice=1; // tìm thấy pt thỏa.
            }
        }
    }
    
    content.innerHTML = '<b>Tổng bình phương</b> các nghiệm của phương trình dưới đây bằng bao nhiêu?';
    // ghi phương trình.
    equation.innerHTML = ghiPhuongTrinh(eq); 

    choices = [];

    let x_1=``, x_2=``;

    // nghiệm 0 là x1.
    if (x1.mauso===1){
        x_1=`${x1.tuso}`;
    }else{
        x_1=`\\dfrac{${x1.tuso}}{${x1.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_1}`));

    // nghiệm 1 là x2.
    if (x2.mauso===1){
        x_2=`${x2.tuso}`;
    }else{
        x_2=`\\dfrac{${x2.tuso}}{${x2.mauso}}`;
    };
    choices.push(katex.renderToString(`${x_2}`));

    // nghiệm 2 là tổng x1 và x2.
    let sum = new Fraction( x1.tuso*x2.mauso + x2.tuso*x1.mauso , x1.mauso*x2.mauso );
    if (sum.mauso===1){
        sum=`${sum.tuso}`;
    }else{
        sum=`\\dfrac{${sum.tuso}}{${sum.mauso}}`;
    };
    choices.push(katex.renderToString(`${sum}`));
    
    // nghiệm 3 tổng bình phương.
    let squaresum = new Fraction( x1.tuso*x1.tuso*x2.mauso*x2.mauso+x2.tuso*x2.tuso*x1.mauso*x1.mauso, x1.mauso*x2.mauso*x1.mauso*x2.mauso );
    if (squaresum.mauso===1){
        squaresum=`${squaresum.tuso}`;
    }else{
        squaresum =`\\dfrac{${squaresum.tuso}}{${squaresum.mauso}}`;
    };
    choices.push(katex.renderToString(`${squaresum}`));


    // trộn
    map =     tronThuTu([0,1,2,3]);
    let newChoices = choices;
    choices =[];
    for (let i=0;i<4; i++){
        choices.push( newChoices[ map[i] ] );
    }
    // hết trộn.


    choicesElement.innerHTML = '';
    let i=0;
    for (const choice of choices){
        choicesElement.innerHTML += `<button class="choice" id="choice${i}"><li>${choice}</li></button><br>`;
        i++;
    }

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
    let cauDung = map.indexOf(3);// chỉ số đáp án đúng. vị trí câu số 3 trong map.

    const correctChoice = document.getElementById(`choice${cauDung}`); // nút chứa đáp án đúng.
    resultButton.addEventListener('click', () => {
        correctChoice.classList.remove('userchoice');
        correctChoice.classList.add('correct');
        if (userChoiceIndex-1!=cauDung && userChoiceIndex!=''){
                userChoice[userChoiceIndex-1].classList.add('wrong');// tô đỏ câu sai.
        }
    });
}

// hết các dạng câu hỏi.
let content = document.querySelector(".content");
let equation = document.querySelector(".equation");
let choicesElement = document.querySelector(".choices");
let resultButton = document.querySelector('#result');

let restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
    switch (Math.floor(Math.random()*5)+1) { // nhân 5 cộng 1 ứng với 5 dạng câu hỏi. DÙNG FLOOR ĐỂ LÀM TRÒN XUỐNG
        case 1:
            taoTracNghiem_HoiNghiem();
            break;
        case 2:
            taoTracNghiem_HoiTong();  
            break;
        case 3:
            taoTracNghiem_SoNghiem();
            break;
        case 4:
            taoTracNghiem_HoiTich();
            break;
        case 5:
            taoTracNghiem_HoiTongBinhPhuong();
            break;
    }
});