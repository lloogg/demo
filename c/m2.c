#include <stdio.h>
/** register
 *  1.定义的变量不一定真的存放在寄存器中
 *  2.cpu取数据的时候去寄存器中拿数据比去内存中拿数据要快
 *  3.因为寄存器比较宝贵，所以不能定义寄存器数组
 *  4.register只能修饰字符型及整形的，不能修饰浮点型
 *  5.不能对寄存器变量取地址，因为只有存放在内存中的数据才有地址
 * 
 *  volatile
 *  1.用volatile定义的变量，是易改变的，及告诉cpu每次用volatile变量的时候，重新去内存中取，保证用的是最新的值，而不是寄存器中的备份
 * @brief 
 * 
 * @param argc 
 * @param argv 
 * @return int 
 */

int main(int argc, char* argv[]) {
    
    return 0;
}