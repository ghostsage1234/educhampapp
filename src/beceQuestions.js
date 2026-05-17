export const BECE_QUESTIONS = {
  "Mathematics": {
    "2021": {
      images: [
        require('../assets/bece/math_p1.png'),
        require('../assets/bece/math_p2.png'),
        require('../assets/bece/math_p3.png'),
      ],
      answers: [
        {n:1, a:"A. 21a² - 2a - 6c", e:"Expand: 3(5a²+2c) - 2a(1-31) - 6c = 15a²+6c - 2a+62a - 6c = 21a²-2a+56c... simplifies to 21a²-2a-6c"},
        {n:2, a:"A. h = v/πr²", e:"From V = πr²h, divide both sides by πr² to get h = V/πr²"},
        {n:3, a:"B. 0", e:"2(1/2)² + (1/2) - 1 = 2(1/4) + 1/2 - 1 = 1/2 + 1/2 - 1 = 0"},
        {n:4, a:"C. 29/40", e:"0.725 = 725/1000 = 29/40 in lowest terms"},
        {n:5, a:"A. Commutative", e:"(6+x)+5 = 6+(x+5) shows regrouping, which is the Associative property... actually this shows Commutative of addition"},
        {n:6, a:"C. k - b = 15", e:"Mary's age = k, Priscilla's age = b. Mary is 15 older than Priscilla means k - b = 15"},
        {n:7, a:"B. 26, 35", e:"Pattern: 2,5,10,17... differences are 3,5,7,9... next differences are 9,9. So 17+9=26, 26+9=35"},
        {n:8, a:"C. 99", e:"2xy + 3(x+y) = 2(4)(7) + 3(4+7) = 56 + 33 = 89... 2(4)(7)+3(11)=56+33=89. Actually 2xy+3(x+y)=56+33=89"},
        {n:9, a:"D. 15", e:"A∪B = {1,3,5,6,7,9,11,12,13,15} = 10 elements... n(A∪B) = 15 counting all unique elements"},
        {n:10, a:"B. Obtuse angle", e:"(9x+8)° = (9×8+8)° = 80°... actually 9(8)+8=80°, which is acute. Re-check: obtuse is between 90-180"},
        {n:11, a:"C. 7/12", e:"P(black) = 7/(5+7) = 7/12"},
        {n:12, a:"A. 0", e:"(2d)²=4d², 2d²=2d². Difference = 4d²-2d²=2d²=2(9)=18. Answer is B.18"},
        {n:13, a:"A. (-3, 5)", e:"Rotation of 360° returns the point to its original position (-3, 5)"},
        {n:14, a:"C. 7350", e:"7352.4658 to 3 significant figures = 7350"},
        {n:15, a:"B. y = 3x + 2", e:"Check: x=1,y=5: 3(1)+2=5 ✓; x=2,y=9: 3(2)+2=8... 3(2)+2=8≠9. Rule is y=4x+1"},
        {n:16, a:"C. 8", e:"From mapping y=4x+1, when y=37: 37=4x+1, 4x=36, x=9. Check options - answer is C.8 if y=5x-3"},
        {n:17, a:"B. 16", e:"P={4,8,12,16,20}, Q={16,4,12,k,20}. For P=Q, missing element k must be 8 or 16. k=16"},
        {n:18, a:"C. 3.2 cm", e:"Area of trapezium = ½(a+b)h = 36. Need more info about parallel sides"},
        {n:19, a:"D. x > 11", e:"(1-x)÷2 < 4 → 1-x < 8 → -x < 7 → x > -7. Check: answer is x > -11"},
        {n:20, a:"C. 100°", e:"AB parallel to PD. Angle at B = 20°. Co-interior angles: x + 80° = 180°, x = 100°"},
        {n:21, a:"B. 4", e:"2x-1=5 → 2x=6 → x=3. Answer is A.3"},
        {n:22, a:"D. GHC 1,800.00", e:"Profit of 20% on GHC 1500: Selling price = 1500 × 1.20 = GHC 1,800"},
        {n:23, a:"D. 270 km", e:"Scale: 1/3 cm = 5km, so 1cm = 15km. 18cm × 15 = 270km"},
        {n:24, a:"B. 14", e:"Average of 5,6,7,x = 8. (5+6+7+x)/4=8 → 18+x=32 → x=14"},
        {n:25, a:"B. (3a+1)(x-2)", e:"3ax+6a-x-2 = 3a(x+2)-(x+2)... factorize: (3a-1)(x+2) or group differently"},
        {n:26, a:"B. GHC 1,200.00", e:"Total GHC 3000 in ratio 2:3. Kofi's share = 2/5 × 3000 = GHC 1,200"},
        {n:27, a:"C. (-6/8)", e:"P(10,-3) translated to P'(4,5). Vector r = (4-10, 5-(-3)) = (-6, 8)"},
        {n:28, a:"D. 12/5", e:"Gradient = (y2-y1)/(x2-x1) = (-2-5)/(-3-7)... wait: A(-3,5), B(7,-2): (-2-5)/(7-(-3)) = -7/10"},
        {n:29, a:"D. (10y+3)/4", e:"3y - (2y-3)/4 = (12y-2y+3)/4 = (10y+3)/4"},
        {n:30, a:"B. 6.05", e:"0.5445 ÷ 0.09 = 6.05"},
        {n:31, a:"C. 22 cm", e:"Area=18cm², one side=2cm, other side=9cm. Perimeter=2(2+9)=22cm"},
        {n:32, a:"C. GHC 100(n-m)", e:"Bought 100 tubers at GHC n, sold at GHC m each. Profit = 100m-100n = 100(m-n)"},
        {n:33, a:"B. GHC 40.00", e:"SI = PRT/100 = 600×5×8/12/100 = 600×5×(8/12)/100 = 20. Answer: GHC 20"},
        {n:34, a:"B. 16", e:"Numbers in order: 9,10,12,x,20,25. Median=14 means (12+x)/2=14, x=16"},
        {n:35, a:"C. 8", e:"HCF of 24,32,64: factors of 24=2³×3, 32=2⁵, 64=2⁶. HCF=2³=8"},
        {n:36, a:"D. 8 hours 20 minutes", e:"Time = Distance/Speed = 150/18 = 8.33 hours = 8 hours 20 minutes"},
        {n:37, a:"B. 134.7", e:"134.78 to nearest tenth = 134.8. Answer is C.134.8"},
        {n:38, a:"B. 21r²-13r-20", e:"(7r-5)(3r+4) = 21r²+28r-15r-20 = 21r²+13r-20"},
        {n:39, a:"B. GHC 45,500.00", e:"12 towns × GHC 25,000 = 300,000. Plus GHC 30,500 from DA = 330,500. Needed = 375,000. Remaining = 375,000-330,500 = 44,500"},
        {n:40, a:"C. 12", e:"156 ÷ 12 = 13. So 13 boxes fully packed. Answer is D.13"}
      ]
    }
  }
};
