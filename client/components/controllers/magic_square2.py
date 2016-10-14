#!/usr/bin/python3
import math
import time
import itertools

#techniques for the creation of the magic square were found here:
#http://www.wikihow.com/Solve-a-Magic-Square

def magic_square(n):

    all_permutations = tuple(itertools.permutations([n for n in range(n*n)])
    
    for permute in permutations:
        matrix = [[0 for i in range(n)] for i in range(n)]

        for i in range(n, len(permute)-n, n):
            for j in range(i, i+n)
                matrix[i/n][j] = permute[j]

    print_matrix(matrix)



#Prints Matrix
def print_matrix(matrix):
    if matrix is not None:
        matrix_size = len(matrix)
        print("Matrix of size: " + str(matrix_size))
        print("=========" *matrix_size, end = "\n\n")

        for row in matrix:
            row_sum = 0;
            for cell in row:
                row_sum += cell
                print(cell, end = "\t")
            print(" | " + str(row_sum))

        print("--\t" * matrix_size)
        for i in range(matrix_size):
            column_sum = 0
            for j in range(matrix_size):
                column_sum += matrix[i][j]
            print(column_sum, end = "\t")
        print("")

if __name__ == '__main__':
    with open('ms_times.txt', 'w') as file:
            file.write("Square Size\tExecution Times\n")

    for i in range(3,4):
        start_time = time.clock()
        magic_square(i) 
        end_time = time.clock()

        with open('ms_times.txt', 'a') as file:
            file.write(str(i) +"\t" +str(end_time) +"\n")