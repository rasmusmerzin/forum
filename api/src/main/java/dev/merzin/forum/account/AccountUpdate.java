package dev.merzin.forum.account;

public record AccountUpdate(
	String firstName,
	String lastName,
	String bio,
	String email
) {}
