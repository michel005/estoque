package com.michel.estoque.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.lang.reflect.Field;

@MappedSuperclass
@ToString
@Getter
@Setter
public abstract class AbstractEntity implements Comparable<AbstractEntity> {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public final void merge(AbstractEntity entidade) {
        for (Field field : this.getClass().getDeclaredFields()) {
            if (!field.getName().equalsIgnoreCase("id")) {
                field.setAccessible(true);
                try {
                    field.set(this, field.get(entidade));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public int compareTo(AbstractEntity o) {
        return o.toString().equals(this.toString()) ? 0 : 1;
    }

    public final boolean isNew() {
        return id == null;
    }
}
