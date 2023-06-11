####################
# Compiler options #
####################
CC = gcc
CFLAGS = -Wall -Wextra -pedantic

###############
# Directories #
###############
SRCDIR = ./src/c
OBJDIR = ./bin/build
BINDIR = ./bin

##############
# Executable #
##############
TWIST_EXECUTABLE = twist
TWIST_TARGET = $(BINDIR)/$(TWIST_EXECUTABLE)
SOLVER_EXECUTABLE = solver
SOLVER_TARGET = $(BINDIR)/$(SOLVER_EXECUTABLE)

###############
# Compile all #
###############
all: twist solver

###################
# Twist compiling #
###################
twist: $(OBJDIR)/twist.o
	$(CC) $< -o $(TWIST_TARGET)

$(OBJDIR)/twist.o: $(SRCDIR)/twist.c
	$(CC) -c -o $@ $< $(CFLAGS)

####################
# Solver compiling #
####################
solver: $(OBJDIR)/solver.o
	$(CC) $< -o $(SOLVER_TARGET)

$(OBJDIR)/solver.o: $(SRCDIR)/solver.c
	$(CC) -c -o $@ $< $(CFLAGS)

#####################
# Build directories #
#####################
build:
	mkdir -p $(OBJDIR)
	touch solution.txt

#####################
# Clean directories #
#####################
clean:
	rm -rf $(BINDIR) $(OBJDIR)
